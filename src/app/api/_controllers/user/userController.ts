// src/controllers/userController.ts
import prismaClient from "@/common/prismaClient";
import { StatusCodes } from "http-status-codes";
import validator from "validator";
import { ApiError } from "../../_common/response";

export const userController = {
	/**
	 * Get all users
	 */
	async getAllUsers() {
		const users = await prismaClient.user.findMany();

		if (users.length === 0) {
			throw new ApiError("No users found", StatusCodes.NOT_FOUND);
		}

		return users;
	},

	/**
	 * Get user by ID
	 */
	async getUserById(id: string) {
		try {
			if (!validator.isUUID(id)) {
				throw new ApiError(
					`Invalid UUID format: ${id}`,
					StatusCodes.BAD_REQUEST,
				);
			}

			const user = await prismaClient.user.findUnique({
				where: { id },
			});

			if (!user) {
				throw new ApiError(
					`User with ID ${id} not found`,
					StatusCodes.NOT_FOUND,
				);
			}

			return user;
		} catch (error) {
			if (error instanceof ApiError) throw error;
			throw new ApiError(
				`Error retrieving user: ${error instanceof Error ? error.message : String(error)}`,
				StatusCodes.INTERNAL_SERVER_ERROR,
			);
		}
	},

	/**
	 * Create a new user
	 */
	async createUser(data: { name: string; email: string; password: string }) {
		if (!data.name || !data.email || !data.password) {
			throw new ApiError(
				"Name, email, and password are required",
				StatusCodes.BAD_REQUEST,
			);
		}

		const existingUser = await prismaClient.user.findUnique({
			where: { email: data.email },
		});

		if (existingUser) {
			throw new ApiError("Email already in use", StatusCodes.BAD_REQUEST);
		}

		return prismaClient.user.create({
			data,
		});
	},

	/**
	 * Update user
	 */
	async updateUser(id: string, data: { name?: string; email?: string }) {
		const existingUser = await prismaClient.user.findUnique({
			where: { id },
		});

		if (!existingUser) {
			throw new ApiError(
				`User with ID ${id} not found`,
				StatusCodes.BAD_REQUEST,
			);
		}

		if (data.email && data.email !== existingUser.email) {
			const emailExists = await prismaClient.user.findUnique({
				where: { email: data.email },
			});

			if (emailExists) {
				throw new ApiError("Email already in use", StatusCodes.BAD_REQUEST);
			}
		}

		return prismaClient.user.update({
			where: { id },
			data,
		});
	},

	/**
	 * Delete user
	 */
	async deleteUser(id: string) {
		const existingUser = await prismaClient.user.findUnique({
			where: { id },
		});

		if (!existingUser) {
			throw new ApiError(
				`User with ID ${id} not found`,
				StatusCodes.BAD_REQUEST,
			);
		}

		return prismaClient.user.delete({
			where: { id },
		});
	},
};
