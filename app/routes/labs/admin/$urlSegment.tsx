import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import React, { useState } from "react";
import { assertDefined } from "~/assert-defined";
import { addLab, getLabByUrlSegment, Lab, saveLab } from "~/models/lab.server";

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;

interface LoaderData {
  lab: Partial<Lab>;
}

export const loader: LoaderFunction = async ({ params }) => {
  if (params.urlSegment !== "new") {
    assertDefined(params.urlSegment);
    const lab = await getLabByUrlSegment(params.urlSegment);
    assertDefined(lab);
    return json({ lab });
  } else {
    const lab: Partial<Lab> = {
      id: "",
      content: "",
      title: "",
      urlSegment: "",
    };
    return json({ lab });
  }
};

function assertString(
  entry: FormDataEntryValue | null
): asserts entry is string {
  if (typeof entry !== "string") {
    throw new Error("no string");
  }
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title");
  const urlSegment = formData.get("urlSegment");
  const content = formData.get("content");
  const id = formData.get("id");

  assertString(title);
  assertString(urlSegment);
  assertString(content);

  if (id === "") {
    await addLab({ title, urlSegment, content });
  } else {
    await saveLab({ id, title, urlSegment, content });
  }

  return redirect("/labs");
};

export default function EditLab() {
  const loaderData = useLoaderData() as LoaderData;
  const [lab, setLab] = useState(loaderData.lab);

  return (
    <Form method="post">
      <input type="hidden" name="id" value={lab.id} />
      <p>
        <label>
          Title:{" "}
          <input
            type="text"
            name="title"
            className={inputClassName}
            value={lab.title}
            onChange={(event) =>
              setLab((lab) => ({ ...lab, title: event.target.value }))
            }
          />
        </label>
      </p>
      <p>
        <label>
          Url Segment:{" "}
          <input
            type="text"
            name="urlSegment"
            value={lab.urlSegment}
            onChange={(event) =>
              setLab((lab) => ({ ...lab, urlSegment: event.target.value }))
            }
            className={inputClassName}
          />
        </label>
      </p>
      <p>
        <label>Content:</label>
        <br />
        <textarea
          rows={20}
          name="content"
          value={lab.content}
          className={`${inputClassName} font-mono`}
          onChange={(event) =>
            setLab((lab) => ({ ...lab, content: event.target.value }))
          }
        />
      </p>
      <p className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
        >
          Save
        </button>
      </p>
    </Form>
  );
}
