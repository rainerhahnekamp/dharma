import { PrismaClient, Workshop } from "@prisma/client";
import is from "@sindresorhus/is";
import bcrypt from "bcryptjs";
import primitive = is.primitive;

const prisma = new PrismaClient();

async function seed() {
  const email = "rainer.hahnekamp@gmail.com";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("63CczMd7Fm6JKQZ", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.note.create({
    data: {
      title: "My first note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  await prisma.note.create({
    data: {
      title: "My second note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  const workshops: Pick<Workshop, "title" | "body">[] = [
    {
      title: "Remix Introduction",
      body: "Introduct into Remix. The new blazing fast backend framework embedded into React",
    },
    {
      title: "Playwright",
      body: "Playwright is an upcoming E2E framework which provides the stability like Cypress but also all the features an out-of-browser testing framework can offer",
    },
    {
      title: "Professional Angular Testing",
      body: "Advanced techniques and technologies in the are of Angular Testing. Covering Testing Library, Cypress, Visual Regression, and Spectator.",
    },
    {
      title: "Professional NgRx",
      body: "Set of topic around NgRx which you encounter in enterprise contexts. Main focus is on best practices, architecture and testing",
    },
    {
      title: "Angular Enterprise Workshop",
      body: "3-day intensive workshop covering architectural topics from class npm libraries up to Microfrontends with Module Federation",
    },
  ];

  for (const { title, body } of workshops) {
    await prisma.workshop.create({ data: { title, body, userId: user.id } });
  }

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
