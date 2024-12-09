import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import app from "@/app";
import { prisma } from "@db/prisma";
import { createPatient } from "@patient/factory";

describe("Patient controller", () => {
  beforeAll(async () => {
    // Clean the database todo dont use it in prod, mock it
    await prisma.patient.deleteMany();
    await prisma.person.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should create patient successfully", async () => {
    const patient = createPatient();
    const response = await request(app).post("/api/patients").send(patient);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("patientId");
    expect(response.body.name).toBe(patient.name);
  });

  it("should fail to create a patient with invalid data", async () => {
    const response = await request(app).post("/api/patients").send({
      name: "",
      surname: "",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });
});
