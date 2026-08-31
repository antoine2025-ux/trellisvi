import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/not-a-fit")({
  beforeLoad: () => {
    throw redirect({ to: "/", hash: "apply" });
  },
});
