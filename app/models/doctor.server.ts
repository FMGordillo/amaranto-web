import type { Password, Doctor } from "@prisma/client";
import bcrypt from "bcryptjs";
import { prisma } from "~/db.server";

export { Doctor };

export async function getUserById(id: Doctor["id"]) {
  return prisma.doctor.findUnique({ where: { id } });
}

export async function getUserByEmail(email: Doctor["email"]) {
  return prisma.doctor.findUnique({ where: { email } });
}

export async function createUser(email: Doctor["email"], password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.doctor.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });
}

export async function deleteUserByEmail(email: Doctor["email"]) {
  return prisma.doctor.delete({ where: { email } });
}

export async function verifyLogin(
  email: Doctor["email"],
  password: Password["hash"]
) {
  const userWithPassword = await prisma.doctor.findUnique({
    where: { email },
    include: {
      password: true,
    },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash
  );

  if (!isValid) {
    return null;
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}
