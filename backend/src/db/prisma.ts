import { AuditAction, PrismaClient } from "@prisma/client";
import { personIdStore } from "@common/middlewares/authMiddleware";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  log: ["query"],
});

const prismaWithLogging = prisma.$extends({
  name: "LoggingExtension",
  query: {
    $allModels: {
      async $allOperations({ operation, model, args, query }) {
        const result = query(args);
        const personId = personIdStore.getStore()?.personId;

        if (!personId) {
          return result;
        }

        const actionsToLog: Record<string, AuditAction> = {
          create: AuditAction.CREATE,
          update: AuditAction.UPDATE,
          delete: AuditAction.DELETE,
          findFirst: AuditAction.GET,
          findMany: AuditAction.GET,
          findUnique: AuditAction.GET,
        };

        if (actionsToLog[operation]) {
          // Use setImmediate to avoid blocking the current execution
          setImmediate(async () => {
            try {
              await prisma.auditLog.create({
                data: {
                  action: actionsToLog[operation],
                  createdAt: new Date().toISOString(),
                  model,
                  personId,
                  log: `${operation.toUpperCase()} - ${model} - ID: ${personId}`,
                },
              });
            } catch (e: any) {
              console.error("Error creating audit log:", e.message);
            }
          });
        }

        return result;
      },
    },
  },
}) as PrismaClient;

export default prismaWithLogging;
