## === PROJECT STRUCTURE LAYER/FEATURE ===

src/
├── features/
│ ├── appointments/
│ │ ├── routes.ts
│ │ ├── controller.ts
│ │ ├── service.ts
│ │ ├── model.ts
│ │ ├── validators.ts
│ │ ├── dto.ts
│ │ └── tests/
│ │ ├── controller.test.ts
│ │ ├── service.test.ts
│ ├── patients/
│ │ ├── routes.ts
│ │ ├── controller.ts
│ │ ├── service.ts
│ │ ├── model.ts
│ │ ├── validators.ts
│ │ ├── dto.ts
│ │ └── tests/
│ │ ├── controller.test.ts
│ │ ├── service.test.ts
│ ├── common/
│ ├── errors/
│ │ ├── CustomError.ts
│ │ ├── ErrorMiddleware.ts
│ ├── middlewares/
│ │ ├── authMiddleware.ts
│ │ ├── validateMiddleware.ts
│ ├── utils/
│ │ ├── hashUtils.ts
│ │ ├── dateUtils.ts
│ ├── prisma.ts
├── app.ts
├── server.ts
└── config/
├── env.ts
├── logger.ts
└── database.ts
