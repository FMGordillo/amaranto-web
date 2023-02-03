import type { Doctor, Patient } from "@prisma/client";
import { prisma } from "~/db.server";

export function getPatient({
  id,
  patientId,
}: Pick<Patient, "id"> & {
  patientId: Patient["id"];
}) {
  return prisma.patient.findFirst({
    select: { id: true, name: true, surname: true },
    where: { id: patientId },
  });
}

// export function getNoteListItems({ userId }: { userId: User["id"] }) {
//   return prisma.note.findMany({
//     where: { userId },
//     select: { id: true, title: true },
//     orderBy: { updatedAt: "desc" },
//   });
// }

export function createPatient({
  name,
  surname,
  doctorId,
}: Pick<Patient, "name" | "surname"> & {
  doctorId: Doctor["id"];
}) {
  return prisma.patient.create({
    data: {
      name,
      surname,
      doctor: {
        connect: {
          id: doctorId,
        },
      },
    },
  });
}

// export function deleteNote({
//   id,
//   userId,
// }: Pick<Note, "id"> & { userId: User["id"] }) {
//   return prisma.note.deleteMany({
//     where: { id, userId },
//   });
// }
