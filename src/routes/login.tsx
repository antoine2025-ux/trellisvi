import { createFileRoute, redirect } from "@tanstack/react-router";

const PLATFORM_LOGIN = "https://platform.trellistudio.tech/login/";

export const Route = createFileRoute("/login")({
  beforeLoad: () => {
    throw redirect({ href: PLATFORM_LOGIN });
  },
});
