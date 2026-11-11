import { buildJob } from "./command";
import { ktString, tokenize } from "./quote";
import type { BuiltJob, EngineConfig, StudioData } from "./types";

function ktList(args: string[], indent = "        "): string {
  if (!args.length) return "emptyList()";
  return `listOf(\n${args.map((arg) => `${indent}${ktString(arg)},`).join("\n")}\n${indent.slice(4)})`;
}

function modeName(mode: EngineConfig["mode"]): string {
  if (mode === "path") return "LOCAL_PATH";
  if (mode === "url") return "REMOTE_URL";
  return "SOURCE";
}

function stripBinary(command: string[]): string[] {
  return command.slice(1);
}

export function gradleKts(): string {
  return `plugins {
    kotlin("jvm") version "2.1.21"
    application
}

repositories {
    mavenCentral()
}

dependencies {
    implementation(kotlin("stdlib"))
}

kotlin {
    jvmToolchain(17)
}

application {
    mainClass.set("kerf.KerfJobKt")
}
`;
}

export function kotlinJob(data: StudioData, job: BuiltJob = buildJob(data)): string {
  const engine = data.engine;
  const flags = tokenize(engine.configureFlags);
  const commands = job.commands.map(stripBinary);
  const primary = commands[commands.length - 1] ?? [];
  const first = commands.length > 1 ? commands[0] : null;
  const jobs = Number(engine.jobs);
  const jobLiteral = Number.isFinite(jobs) && jobs > 0 ? String(Math.floor(jobs)) : "0";

  return `// 刃帧 KERF 生成的 Kotlin 作业。
// 只依赖 JDK 17+ 与 Kotlin 标准库，不拉取第三方 FFmpeg 封装。
//
// 命令行：
//   kotlinc KerfJob.kt -include-runtime -d kerf.jar && java -jar kerf.jar
// Gradle：
//   将本文件放到 src/main/kotlin/kerf/KerfJob.kt 后执行 ./gradlew run
//
// 浏览器里的刃帧不会启动你机器上的 ffmpeg。把这个文件带回本机再跑。

package kerf

import java.net.URI
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.StandardCopyOption
import java.nio.file.attribute.PosixFilePermission
import java.security.MessageDigest
import java.time.Duration
import java.util.Locale

enum class EngineMode { LOCAL_PATH, REMOTE_URL, SOURCE }

data class EngineSpec(
    val mode: EngineMode,
    val binaryPath: String,
    val binaryUrl: String,
    val sha256: String,
    val sourceUrl: String,
    val sourceRef: String,
    val configureFlags: List<String>,
    val prefix: String,
    val jobs: Int,
    val workDir: String,
)

class EngineResolveException(message: String) : RuntimeException(message)

object FfmpegLocator {
    fun resolve(spec: EngineSpec, workDir: Path): Path = when (spec.mode) {
        EngineMode.LOCAL_PATH -> resolveLocal(spec.binaryPath)
        EngineMode.REMOTE_URL -> resolveUrl(spec, workDir)
        EngineMode.SOURCE -> resolveSource(spec, workDir)
    }

    private fun resolveLocal(raw: String): Path {
        if (raw.isBlank()) throw EngineResolveException("没有填写本地路径")
        val path = Path.of(raw)
        if (!Files.exists(path)) throw EngineResolveException("找不到二进制：\$path")
        if (Files.isDirectory(path)) throw EngineResolveException("路径是目录：\$path")
        if (!isWindows() && !Files.isExecutable(path)) {
            throw EngineResolveException("文件存在但没有执行权限：\$path")
        }
        return path.toAbsolutePath().normalize()
    }

    private fun resolveUrl(spec: EngineSpec, workDir: Path): Path {
        if (spec.binaryUrl.isBlank()) throw EngineResolveException("没有填写下载 URL")
        val cache = workDir.resolve("cache")
        Files.createDirectories(cache)
        val target = cache.resolve(cacheName(spec.binaryUrl))
        if (Files.isRegularFile(target) && shaMatches(target, spec.sha256)) {
            markExecutable(target)
            return target
        }
        val tmp = Files.createTempFile(cache, "ffmpeg-", ".download")
        val client = HttpClient.newBuilder()
            .followRedirects(HttpClient.Redirect.ALWAYS)
            .connectTimeout(Duration.ofSeconds(20))
            .build()
        val request = HttpRequest.newBuilder(URI.create(spec.binaryUrl))
            .timeout(Duration.ofMinutes(15))
            .GET()
            .build()
        val response = client.send(request, HttpResponse.BodyHandlers.ofFile(tmp))
        if (response.statusCode() !in 200..299) {
            Files.deleteIfExists(tmp)
            throw EngineResolveException("下载失败：HTTP \${response.statusCode()}")
        }
        if (!shaMatches(tmp, spec.sha256)) {
            Files.deleteIfExists(tmp)
            throw EngineResolveException("SHA-256 不一致，已丢弃下载文件")
        }
        Files.move(tmp, target, StandardCopyOption.REPLACE_EXISTING)
        markExecutable(target)
        return target
    }

    private fun resolveSource(spec: EngineSpec, workDir: Path): Path {
        if (spec.sourceUrl.isBlank()) throw EngineResolveException("没有填写源码仓库")
        val prefix = workDir.resolve(if (spec.prefix.isBlank()) "build/ffmpeg" else spec.prefix)
        val built = prefix.resolve(if (isWindows()) "bin/ffmpeg.exe" else "bin/ffmpeg")
        if (Files.isRegularFile(built)) {
            markExecutable(built)
            return built
        }
        if (isWindows()) {
            throw EngineResolveException("源码构建面向 Linux / macOS。Windows 请改用远程二进制 URL。")
        }
        val src = workDir.resolve("src/ffmpeg")
        if (!Files.isDirectory(src.resolve(".git"))) {
            Files.createDirectories(src.parent)
            run(
                listOf(
                    "git", "clone", "--depth", "1", "--branch", spec.sourceRef.ifBlank { "master" },
                    spec.sourceUrl, src.toString(),
                ),
                workDir,
            )
        }
        val jobs = if (spec.jobs > 0) spec.jobs else Runtime.getRuntime().availableProcessors().coerceAtLeast(1)
        val configure = mutableListOf(src.resolve("configure").toString(), "--prefix=\${prefix.toAbsolutePath()}")
        configure += spec.configureFlags
        run(configure, src)
        run(listOf("make", "-j\$jobs"), src)
        run(listOf("make", "install"), src)
        if (!Files.isRegularFile(built)) throw EngineResolveException("编译结束但未找到 \$built")
        markExecutable(built)
        return built
    }

    private fun cacheName(url: String): String {
        val path = runCatching { URI.create(url).path }.getOrDefault("").lowercase(Locale.US)
        return if (path.endsWith(".exe")) "ffmpeg.exe" else "ffmpeg"
    }

    private fun shaMatches(path: Path, expected: String): Boolean {
        val want = expected.trim().lowercase(Locale.US)
        if (want.isEmpty()) return true
        return sha256(path) == want
    }

    private fun sha256(path: Path): String {
        val digest = MessageDigest.getInstance("SHA-256")
        Files.newInputStream(path).use { input ->
            val buffer = ByteArray(1 shl 16)
            while (true) {
                val read = input.read(buffer)
                if (read < 0) break
                digest.update(buffer, 0, read)
            }
        }
        return digest.digest().joinToString("") { "%02x".format(it) }
    }

    private fun markExecutable(path: Path) {
        try {
            val perms = Files.getPosixFilePermissions(path).toMutableSet()
            perms += PosixFilePermission.OWNER_READ
            perms += PosixFilePermission.OWNER_EXECUTE
            Files.setPosixFilePermissions(path, perms)
        } catch (_: UnsupportedOperationException) {
            path.toFile().setExecutable(true)
        }
    }

    private fun run(command: List<String>, directory: Path) {
        val process = ProcessBuilder(command)
            .directory(directory.toFile())
            .redirectErrorStream(true)
            .start()
        process.inputStream.bufferedReader().useLines { lines -> lines.forEach(::println) }
        val code = process.waitFor()
        if (code != 0) throw EngineResolveException("命令失败（\$code）：\${command.joinToString(" ")}")
    }

    private fun isWindows(): Boolean =
        System.getProperty("os.name").lowercase(Locale.US).contains("win")
}

class FfmpegRunner(private val binary: Path) {
    fun execute(args: List<String>): Int {
        val command = ArrayList<String>(args.size + 1)
        command += binary.toString()
        command += args
        val process = ProcessBuilder(command)
            .redirectErrorStream(true)
            .start()
        process.inputStream.bufferedReader().useLines { lines ->
            lines.forEach { line ->
                println(line)
                parseProgress(line)
            }
        }
        return process.waitFor()
    }

    private fun parseProgress(line: String) {
        val separator = line.indexOf('=')
        if (separator <= 0) return
        val key = line.substring(0, separator)
        val value = line.substring(separator + 1)
        if (key == "out_time" || key == "progress") println("kerf \$key \$value")
    }
}

object KerfJob {
    val spec = EngineSpec(
        mode = EngineMode.${modeName(engine.mode)},
        binaryPath = ${ktString(engine.binaryPath.trim())},
        binaryUrl = ${ktString(engine.binaryUrl.trim())},
        sha256 = ${ktString(engine.sha256.trim())},
        sourceUrl = ${ktString(engine.sourceUrl.trim())},
        sourceRef = ${ktString(engine.sourceRef.trim())},
        configureFlags = ${ktList(flags)},
        prefix = ${ktString(engine.prefix.trim() || "build/ffmpeg")},
        jobs = ${jobLiteral},
        workDir = ${ktString(engine.workDir.trim() || ".")},
    )

    fun arguments(): List<String> = rewriteNull(${ktList(primary)})
${
  first
    ? `
    fun passOne(): List<String> = rewriteNull(${ktList(first)})
`
    : `
    fun passOne(): List<String>? = null
`
}

    private fun rewriteNull(args: List<String>): List<String> {
        val sink = if (System.getProperty("os.name").lowercase(Locale.US).contains("win")) "NUL" else "/dev/null"
        return args.map { if (it == "/dev/null") sink else it }
    }
}

fun main() {
    val work = Path.of(KerfJob.spec.workDir).toAbsolutePath().normalize()
    Files.createDirectories(work)
    val binary = FfmpegLocator.resolve(KerfJob.spec, work)
    println("kerf binary \$binary")
    val runner = FfmpegRunner(binary)
    val first = KerfJob.passOne()
    if (first != null) {
        val passCode = runner.execute(first)
        if (passCode != 0) kotlin.system.exitProcess(passCode)
    }
    kotlin.system.exitProcess(runner.execute(KerfJob.arguments()))
}
`;
}
