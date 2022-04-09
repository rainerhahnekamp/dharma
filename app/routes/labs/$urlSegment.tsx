import { json, LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { marked } from "marked";
import { assertDefined } from "~/assert-defined";
import { getLabByUrlSegment, Lab } from "~/models/lab.server";

interface LoaderData {
  lab: Lab & { html: string };
}
export const loader: LoaderFunction = async ({ params }) => {
  assertDefined(params.urlSegment);
  const lab = await getLabByUrlSegment(params.urlSegment);
  assertDefined(lab);
  return json<LoaderData>({ lab: { ...lab, html: marked(lab.content) } });
};

export default function LabUrlSegment() {
  const { lab } = useLoaderData() as LoaderData;
  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">{lab.title}</h1>
      <Link
        to={"../labs/edit/" + lab.urlSegment}
        className="text-blue-600 underline"
      >
        Edit
      </Link>
      <div dangerouslySetInnerHTML={{ __html: lab.html }}></div>
    </main>
  );
}
