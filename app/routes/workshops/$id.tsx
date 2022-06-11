import { Workshop } from "@prisma/client";
import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

interface LoaderData {
  workshop: Workshop | undefined;
}

const loader: LoaderFunction = async ({}) => {
  return json<LoaderData>({ workshop: undefined });
};

export default function WorkshopDetail() {
  const { workshop } = useLoaderData();
}
