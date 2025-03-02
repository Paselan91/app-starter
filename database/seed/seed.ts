import { PrismaClient } from "@prisma/client";
import { cyan } from "colorette";
import { user } from "./data/user";

const prisma = new PrismaClient();

async function seed() {
	console.log(cyan("Start RDS seeding RDS..."));

	await prisma.user.createMany({
		data: user,
	});

	console.log(cyan("Seeding finished."));
}

seed()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
