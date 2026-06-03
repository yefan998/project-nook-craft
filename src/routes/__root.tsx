import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { CosmicDecor } from "../components/CosmicDecor";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="display-italic text-7xl text-accent">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Path not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This page has drifted beyond the celestial chart.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-sm bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="display-italic text-3xl text-foreground">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. Try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-sm border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Chinese Five Elements & Destiny Analysis | Sìshén" },
      {
        name: "description",
        content:
          "Discover your Chinese zodiac, Five Elements (Wu Xing) profile, lucky colors and numbers, daily fortune and love compatibility — modern destiny analysis rooted in ancient tradition.",
      },
      { name: "author", content: "Sìshén" },
      { property: "og:title", content: "Chinese Five Elements & Destiny Analysis | Sìshén" },
      {
        property: "og:description",
        content:
          "Map your character, career and cosmic resonance with Chinese zodiac and Five Elements destiny analysis.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Sìshén" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@Sishen" },
      { name: "twitter:title", content: "Chinese Five Elements & Destiny Analysis | Sìshén" },
      { name: "description", content: "Discover your Chinese Zodiac, Five Elements, lucky colors, love compatibility, and daily fortune with personalized destiny analysis." },
      { property: "og:description", content: "Discover your Chinese Zodiac, Five Elements, lucky colors, love compatibility, and daily fortune with personalized destiny analysis." },
      { name: "twitter:description", content: "Discover your Chinese Zodiac, Five Elements, lucky colors, love compatibility, and daily fortune with personalized destiny analysis." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/385ef51c-b75b-45a9-878d-172b531688f9/id-preview-aad9d7e6--e62b36e6-e62a-4aff-b74b-0055a7e4efbc.lovable.app-1780437270955.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/385ef51c-b75b-45a9-878d-172b531688f9/id-preview-aad9d7e6--e62b36e6-e62a-4aff-b74b-0055a7e4efbc.lovable.app-1780437270955.png" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Sìshén — Chinese Five Elements & Destiny Analysis",
          description:
            "Chinese zodiac, Five Elements (Wu Xing), lucky information, daily fortune and love compatibility analysis.",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <CosmicDecor />
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          {/* Required: nested routes render here. */}
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}
