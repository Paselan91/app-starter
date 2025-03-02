import { PrismaClient } from "@prisma/client";
import { cyan } from "colorette";
import { truncate } from "./common";

const prisma = new PrismaClient();

async function truncateDb() {
	console.log(cyan("Start clear data ..."));
	await truncate(prisma);
	console.log(cyan("Clearing data finished."));
}

truncateDb()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
