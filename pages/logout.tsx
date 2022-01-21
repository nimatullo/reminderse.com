import { useEffect } from "react"
import { userService } from "../service/user.service";

export default function Logout() {

	useEffect(() => {
		userService.logout();
	}, []);

	return (
		<div>
			<h1>Logging out...</h1>
		</div>
	)
}