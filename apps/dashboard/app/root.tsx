import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';

import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/nprogress/styles.css';

import mantineTheme from './theme';

import './shared.css';

import { NavigationProgress } from '@mantine/nprogress';

import ErrorFallback from '@components/ErrorFallback';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={mantineTheme}>
          <NavigationProgress color="#BD93F9" />
          {children}
        </MantineProvider>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={mantineTheme}>
          <ErrorFallback />
        </MantineProvider>
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
