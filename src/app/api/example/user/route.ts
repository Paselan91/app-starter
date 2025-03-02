import { withErrorHandling } from "../../_common/response";
import { userController } from "../../_controllers/user/userController";

export async function GET() {
	return withErrorHandling(async () => {
		return userController.getAllUsers();
	});
}
