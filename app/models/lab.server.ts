import { prisma } from "~/db.server";

export interface Lab {
  id: string;
  urlSegment: string;
  title: string;
  content: string;
}

export async function getLabs(): Promise<Lab[]> {
  return prisma.lab.findMany();
}

export async function getLabByUrlSegment(urlSegment: string) {
  return prisma.lab.findUnique({ where: { urlSegment } });
}

export async function saveLab(lab: Lab) {
  return prisma.lab.update({
    data: lab,
    where: { id: lab.id },
  });
}

export async function addLab(lab: Omit<Lab, "id">) {
  return prisma.lab.create({ data: lab });
}
