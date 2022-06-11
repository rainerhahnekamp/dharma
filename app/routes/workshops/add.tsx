import { ActionFunction, json, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import * as React from "react";
import { verifyLogin } from "~/models/user.server";
import { createWorkshop } from "~/models/workshop.server";
import { getUser } from "~/session.server";

interface ActionData {
  errors: { title?: boolean; body?: boolean; user?: boolean };
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title");
  const body = formData.get("body");
  const user = await getUser(request);

  if (typeof title !== "string") {
    return json<ActionData>({ errors: { title: true } });
  }

  if (typeof body !== "string") {
    return json<ActionData>({ errors: { body: true } });
  }

  if (user === null) {
    return json<ActionData>({ errors: { user: true } });
  }

  await createWorkshop({ title, body, userId: user.id });
  return redirect("/workshops");
};

export default function WorkshopAddRoute() {
  return (
    <Form method="post">
      <div className="mx-auto flex max-w-xs flex-col space-y-6">
        <div className="field">
          <label htmlFor="title" className="block">
            Title
          </label>
          <InputText id="title" className="block w-full" name="title" />
        </div>
        <div className="body">
          <label htmlFor="body" className="block">
            Description
          </label>
          <InputTextarea id="body" className="block w-full" name="body" />
        </div>
        <div className="flex justify-center">
          <Button type="submit">Save</Button>
        </div>
      </div>
    </Form>
  );
}
