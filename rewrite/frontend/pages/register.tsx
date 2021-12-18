import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { userService } from "../service/user.service";
import Image from "next/image";
import Link from "next/link";
import { BiErrorCircle } from "react-icons/bi";

export default function Register() {

	const router = useRouter();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		if (userService.userValue) {
			router.push("/");
		}
	}, []);

	function registerUser() {
		setIsLoading(true);
		console.log(email, username, password, passwordConfirmation);

		if (password !== passwordConfirmation) {
			setError("Passwords do not match!");
			setIsLoading(false);
			return;
		}
		if (password.length < 8) {
			setError("Password must be at least 8 characters long!");
			setIsLoading(false);
			return;
		}

		return userService.register(email, username, password)
			.then((res) => {
				console.log("register success", res);
				router.push("/login");
			})
			.catch((err) => {
					setError(err.response);
			})
			.finally(() => setIsLoading(false));	
	}

	return (
		<>
			<Navbar />
			<div className="min-h-full flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
				<div className="p-4 max-w-md w-full space-y-5">
					<div>
						<div className="flex justify-center items-center">
							<Image src="/reminderse.png" height="100" width="100" className="mx-auto h-12 w-auto" alt="Reminderse" />
						</div>
						<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create a new account</h2>
						<div className="divider">or</div>
						<p className="mt-2 text-center text-sm text-gray-600">
							<Link href="/login">
								<a className="mt-2 text-center text-sm text-primary hover:underline">log in to an existing one</a>
							</Link>
						</p>
					</div>
					{error && (
						<div className="alert alert-error">
							<div className="flex-1">
								<BiErrorCircle className="w-6 h-6 mx-2" />
								<label>{error}</label>
							</div>
						</div>
					)}
					<div className="form-control">
						<label htmlFor="username" className="input-group input-group-vertical input-group-md">
							<span className="bg bg-secondary" style={{ "color": "white" }}>Username</span>
							<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="Username" className="input input-bordered" />
						</label>
					</div>
					<div className="form-control">
						<label htmlFor="email" className="input-group input-group-vertical input-group-md">
							<span className="bg bg-secondary" style={{ "color": "white" }}>Email</span>
							<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="example@reminderse.com" className="input input-bordered" />
						</label>
					</div>
					<div className="form-control">
						<label htmlFor="password" className="input-group input-group-vertical input-group-md">
							<span className="bg bg-secondary flex justify-between" style={{ "color": "white" }}>
								<p>Password</p>
							</span>
							<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="At least 8 characters" className="input input-bordered" />
						</label>
					</div>
					<div className="form-control">
						<label htmlFor="password" className="input-group input-group-vertical input-group-md">
							<span className="bg bg-secondary flex justify-between" style={{ "color": "white" }}>
								<p>Confirm password</p>
							</span>
							<input type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} required placeholder="Confirm password" className="input input-bordered" />
						</label>
					</div>
					<label className="flex items-center">
						<input type="checkbox" className="form-checkbox" />
						<span className="ml-2">I agree to the <Link href="/terms">
								<a className="text-primary hover:underline">terms and conditions</a>
							</Link>
						</span>
					</label>
					<button onClick={registerUser} className={`${isLoading ? "loading" : ""} btn btn-primary w-full shadow-primary/50 shadow-sm`}>Create new account</button>
				</div>
			</div>
		</>
	)
}