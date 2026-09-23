// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: "/studio/",
  },
  // Lovable's option type only lists preset/output/cloudflare. The Nitro Vite
  // plugin still forwards the rest of this object, including baseURL, which is
  // what mounts public assets at /studio/assets instead of /assets.
  nitro: {
    baseURL: "/studio/",
  } as unknown as { preset?: string },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // Start 1.168 reads router.basepath into TSS_ROUTER_BASEPATH and applies it
    // in hydrateStart and createStartHandler. Link `to` paths are prefixed by
    // rewriteBasepath on the way out.
    router: { basepath: "/studio" },
  },
});
