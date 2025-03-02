import type { PrismaClient } from "@prisma/client";
import { red } from "colorette";

const SCHEMA_NAME = process.env.SCHEMA_NAME || "public";

if (!SCHEMA_NAME) {
	throw new Error("SCHEMA_NAME is not set");
}

export async function truncate(prisma: PrismaClient) {
	// Get all table names in the specified schema
	const tablenames = await prisma.$queryRaw<
		Array<{ tablename: string }>
	>`SELECT tablename
      FROM pg_tables
     WHERE schemaname = ${SCHEMA_NAME};`;

	// Truncate all tables
	for (const { tablename } of tablenames) {
		console.log(`Truncating table '${tablename}'...`);
		try {
			// Truncate table with CASCADE to handle foreign key constraints
			await prisma.$executeRawUnsafe(
				`TRUNCATE TABLE "${SCHEMA_NAME}"."${tablename}" CASCADE;`,
			);
			console.log(`Table '${tablename}' truncated`);
		} catch (error) {
			console.error(red(`Error truncating table '${tablename}': ${error}`));
		}
	}
}
