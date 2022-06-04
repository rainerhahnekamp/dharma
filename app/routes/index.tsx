import { LinksFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Button } from "primereact/button";

import { useOptionalUser } from "~/utils";
import stylesUrls from "~/styles/index.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrls }];
};

export default function Index() {
  const user = useOptionalUser();

  return (
    <div>
      {user ? (
        <div>
          <Link to="/workshops" className="p-button">
            Workshops Administration
          </Link>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="mb-4">
            Welcome, please introduce yourself by either signing up or logging
            in
          </h1>
          <div className="space-x-4">
            <Link to="/join" className="p-button ml-2">
              Sign up
            </Link>
            <Link to="/login" className="p-button mr-2">
              Log In
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
