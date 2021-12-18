import { AppProps } from "next/dist/shared/lib/router/router";
import { useRouter } from "next/router";
import { useEffect, useState, FC } from "react";
import { userService } from "../service/user.service";

export function RouteGuard({children}: any) {
	const router = useRouter();
	const [authorized, setAuthorized] = useState(false);

	useEffect(()=>{
		authCheck(router.asPath)

		const hideContent = () => setAuthorized(false);
		router.events.on("routeChangeStart", hideContent);
		router.events.on("routeChangeComplete", authCheck);

		return () => {
			router.events.off("routeChangeStart", hideContent);
			router.events.off("routeChangeComplete", authCheck);
		}
	}, []);

	function authCheck(url: string) {
		const publicPaths = ['/login', '/', '/register'];
		const path = url.split("?")[0];
		if (!userService.userValue && !publicPaths.includes(path)) {
			setAuthorized(false);
			router.push({
				pathname: "/login",
				query: { returnUrl: router.asPath }
			});
		} else {
			setAuthorized(true);
		}
		}

		return (authorized && children);
}

