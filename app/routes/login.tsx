import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import * as React from "react";

import { createUserSession, getUserId } from "~/session.server";
import { verifyLogin } from "~/models/user.server";
import { validateEmail } from "~/utils";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

interface ActionData {
  errors?: {
    email?: string;
    password?: string;
  };
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = formData.get("redirectTo");
  const remember = formData.get("remember");

  if (!validateEmail(email)) {
    return json<ActionData>(
      { errors: { email: "Email is invalid" } },
      { status: 400 }
    );
  }

  if (typeof password !== "string") {
    return json<ActionData>(
      { errors: { password: "Password is required" } },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return json<ActionData>(
      { errors: { password: "Password is too short" } },
      { status: 400 }
    );
  }

  const user = await verifyLogin(email, password);

  if (!user) {
    return json<ActionData>(
      { errors: { email: "Invalid email or password" } },
      { status: 400 }
    );
  }

  return createUserSession({
    request,
    userId: user.id,
    remember: remember === "on" ? true : false,
    redirectTo: typeof redirectTo === "string" ? redirectTo : "/",
  });
};

export const meta: MetaFunction = () => {
  return {
    title: "Login",
  };
};

export function CatchBoundary() {
  return <p>Sorry, there was a problem with the login.</p>;
}

export function ErrorBoundary() {
  return <p>Sorry, there was a problem with the login.</p>;
}

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";

  return (
    <Form method="post">
      <div className="mx-auto flex max-w-xs flex-col space-y-6">
        <div className="field">
          <label htmlFor="email" className="block">
            EMail
          </label>
          <InputText
            id="email"
            className="block w-full"
            name="email"
            autoComplete="email"
            autoFocus={true}
          />
        </div>
        <div className="field">
          <label htmlFor="password" className="block">
            Password
          </label>
          <InputText
            id="password"
            type="password"
            className="block w-full"
            name="password"
            autoComplete="currentPassword"
          />
        </div>
        <input type="hidden" name="redirectTo" value={redirectTo} />
        <div className="field-checkbox">
          <input
            type="checkbox"
            name="remember"
            id="remember"
            className="p-checkbox"
          />
          <label htmlFor="remember" className="pl-1">
            Remember me
          </label>
        </div>
        <div className="flex justify-center">
          <Button type="submit">Log in</Button>
        </div>
        <hr />
        <p>Don't have an account? </p>
        <p>
          <Link
            className="link"
            to={{
              pathname: "/join",
              search: searchParams.toString(),
            }}
          >
            Sign up
          </Link>
        </p>
      </div>
    </Form>
  );
}
