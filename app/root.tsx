import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Form,
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import primeIcons from "primeicons/primeicons.css";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import primeCore from "primereact/resources/primereact.min.css";
import primeTheme from "primereact/resources/themes/fluent-light/theme.css";
import { loadWorkshops } from "~/models/workshop.server";
import { useOptionalUser } from "~/utils";
import shared from "./styles/shared.css";

import { getUser } from "./session.server";

import tailwindStylesheetUrl from "./styles/tailwind.css";

const title = "Dharma - Interactive Workshops for Developers";

export const links: LinksFunction = () =>
  [tailwindStylesheetUrl, primeTheme, primeCore, primeIcons, shared].map(
    (href) => ({
      rel: "stylesheet",
      href,
    })
  );

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title,
  viewport: "width=device-width,initial-scale=1",
});

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
  workshopsCount: number;
};

export const loader: LoaderFunction = async ({ request }) => {
  return json<LoaderData>({
    user: await getUser(request),
    workshopsCount: (await loadWorkshops()).length,
  });
};

export default function App() {
  const { workshopsCount } = useLoaderData<LoaderData>();
  const user = useOptionalUser();
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="mx-auto max-w-screen-2xl">
          <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
            <h1 className="text-3xl font-bold">
              <Link to="/">{title}</Link>
            </h1>
            <div className="flex items-center gap-4">
              {user ? (
                <Form action="/logout" method="post">
                  <Button type="submit">Logout</Button>
                </Form>
              ) : (
                ""
              )}
              <Badge value={workshopsCount}></Badge>
            </div>
          </header>
          <main className="bg-white p-4">
            <Outlet />
          </main>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
