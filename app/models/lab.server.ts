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

export async function saveLab(lab: Omit<Lab, "id">) {
  return prisma.lab.update({
    data: lab,
    where: { urlSegment: lab.urlSegment },
  });
}
