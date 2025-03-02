import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

type ApiResponse<T = unknown> = {
	success: boolean;
	data: T | null;
	error: string | null;
	statusCode: number;
};

/**
 * Generate a success response
 * @param data Response data
 * @param statusCode HTTP status code (default: 200 OK)
 */
export function successResponse<T>(
	data: T,
	statusCode = StatusCodes.OK,
): NextResponse<ApiResponse<T>> {
	return NextResponse.json(
		{
			success: true,
			data,
			error: null,
			statusCode,
		},
		{ status: statusCode },
	);
}

/**
 * Generate an error response
 * @param error Error message or Error object
 * @param statusCode HTTP status code (default: 500 INTERNAL_SERVER_ERROR)
 */
export function errorResponse(
	error: string | Error,
	statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
): NextResponse<ApiResponse<null>> {
	const errorMessage = error instanceof Error ? error.message : error;

	console.error(`API Error (${statusCode}):`, errorMessage);

	return NextResponse.json(
		{
			success: false,
			data: null,
			error: errorMessage,
			statusCode,
		},
		{ status: statusCode },
	);
}

/**
 * Higher-order function that wraps API handlers to provide error handling
 * @param handler Async function that performs API operations
 */
export function withErrorHandling<T>(
	handler: () => Promise<T>,
): Promise<NextResponse<ApiResponse<T> | ApiResponse<null>>> {
	return handler()
		.then((data) => successResponse(data))
		.catch((error: unknown) => {
			// Determine status code (for custom errors)
			const statusCode =
				error instanceof ApiError
					? error.statusCode
					: StatusCodes.INTERNAL_SERVER_ERROR;
			return errorResponse(
				error instanceof Error ? error : String(error),
				statusCode,
			);
		});
}

/**
 * Custom error class to throw errors with specific status codes
 */
export class ApiError extends Error {
	statusCode: number;

	constructor(message: string, statusCode = StatusCodes.BAD_REQUEST) {
		super(message);
		this.name = "ApiError";
		this.statusCode = statusCode;
	}
}

// Export API response type
export type { ApiResponse };
