import { Workshop } from "@prisma/client";
import { json, LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { loadWorkshops } from "~/models/workshop.server";

export interface LoaderData {
  workshops: Workshop[];
}

export const loader: LoaderFunction = async () => {
  const workshops = await loadWorkshops();
  return json<LoaderData>({ workshops });
};

export default function WorkshopsIndex() {
  const { workshops } = useLoaderData<LoaderData>();

  return (
    <div>
      <h2>Workshops</h2>
      <div>
        {workshops.map((workshop, ix) => (
          <Link key={ix} to={workshop.id} className="link">
            <p>{workshop.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
