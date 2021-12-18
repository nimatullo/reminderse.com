import axios from "axios";
import { BehaviorSubject} from 'rxjs';

const API_URL = "http://localhost:5000";

const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem("user")));
export const userService = {
	user: userSubject.asObservable(),
	get userValue() {return userSubject.value},
	login,
	register,
}

interface LoginResponse {
	message: string,
	username: string,
	id: string
}

function login(email: string, password: string): Promise<LoginResponse> {
	return axios
		.post<LoginResponse>(`${API_URL}/api/login`, {email, password}, {withCredentials: true})
		.then(user => {			
			localStorage.setItem("user", JSON.stringify(user.data));
			userSubject.next(user.data);
			return user.data;
		});
}

function register(email: string, username: string, password: string): Promise<{message: string}> {
	return axios
		.post<{message: string}>(`${API_URL}/api/register`, {email, username, password}, {withCredentials: true})
		.then(res => res.data);
}