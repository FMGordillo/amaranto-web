import type { Appointment, Doctor, Patient } from "@prisma/client";
import { prisma } from "~/db.server";

export function getAppointment({
  id,
  doctorId,
  patientId,
}: Pick<Appointment, "id"> & {
  patientId: Patient["id"];
  doctorId: Doctor["id"];
}) {
  return prisma.appointment.findFirst({
    select: { id: true, text: true },
    where: { id, patientId, doctorId },
  });
}

// export function getNoteListItems({ userId }: { userId: User["id"] }) {
//   return prisma.appointment.findMany({
//     where: { userId },
//     select: { id: true, title: true },
//     orderBy: { updatedAt: "desc" },
//   });
// }

export function createAppointment({
  text,
  patientId,
  doctorId,
}: Pick<Appointment, "text"> & {
  doctorId: Doctor["id"];
  patientId: Patient["id"];
}) {
  return prisma.appointment.create({
    data: {
      text,
      doctor: {
        connect: {
          id: doctorId,
        },
      },
      patient: {
        connect: {
          id: patientId,
        },
      },
    },
  });
}

// export function deleteNote({
//   id,
//   userId,
// }: Pick<Note, "id"> & { userId: User["id"] }) {
//   return prisma.appointment.deleteMany({
//     where: { id, userId },
//   });
// }
