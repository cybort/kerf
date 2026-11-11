import { createFileRoute } from "@tanstack/react-router";
import { Studio } from "@/components/kutora/studio";

export const Route = createFileRoute("/")({
  component: Studio,
});
