import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getLabs } from "~/models/lab.server";

interface LoaderData {
  labs: Awaited<ReturnType<typeof getLabs>>;
}

export const loader = async () => {
  const labs = await getLabs();
  return json<LoaderData>({
    labs,
  });
};

export default function Index() {
  const { labs } = useLoaderData() as LoaderData;
  return (
    <main>
      <h1>Labs</h1>
      <Link to="/labs/admin/new" className="text-blue-600 underline">
        Add New Lab
      </Link>
      <ul>
        {labs.map((lab) => (
          <li key={lab.urlSegment}>
            <Link to={lab.urlSegment} className="text-blue-600 underline">
              {lab.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
