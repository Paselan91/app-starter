import type { NextRequest } from "next/server";
import { withErrorHandling } from "../../../_common/response";
import { userController } from "../../../_controllers/user/userController";

export async function GET(
	_: NextRequest,
	{ params }: { params: { userId: string } },
) {
	return withErrorHandling(async () => {
		return userController.getUserById(params.userId);
	});
}
