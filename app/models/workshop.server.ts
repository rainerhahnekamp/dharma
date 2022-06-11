import type { Workshop } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Workshop } from "@prisma/client";

export function loadWorkshops() {
  return prisma.workshop.findMany();
}

export function createWorkshop({
  title,
  body,
  userId,
}: Pick<Workshop, "title" | "body" | "userId">) {
  return prisma.workshop.create({
    data: {
      title,
      body,
      user: { connect: { id: userId } },
    },
  });
}
