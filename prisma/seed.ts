import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "admin@mail.com";

  const hashedPassword = await bcrypt.hash("admin", 10);

  const myDoctor = await prisma.doctor.upsert({
    where: {
      email,
    },
    update: {},
    create: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
    include: {
      patients: true,
      appointments: true,
    },
  });

  const myPatient = await prisma.patient.upsert({
    where: {
      id: myDoctor.patients[0]?.id,
    },
    update: {},
    create: {
      name: "Facundo",
      surname: "Gordillo",
      doctor: {
        connect: {
          id: myDoctor.id,
        },
      },
    },
  });

  await prisma.appointment
    .upsert({
      where: {
        id: myDoctor.appointments[0]?.id,
      },
      update: {},
      create: {
        text: "This is going pretty good!",
        patient: {
          connect: {
            id: myPatient.id,
          },
        },
        doctor: {
          connect: {
            id: myDoctor.id,
          },
        },
      },
    })
    .catch(() => {});

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
