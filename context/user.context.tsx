import { createContext, FC, useContext, useState } from "react";
import { User } from "../models/User";

export interface UserContext {
	user?: User;
	setUser: (user?: User) => void;
}

export const UserContextImpl = createContext<UserContext>(null!)

export function useUser() {
	return useContext(UserContextImpl);
}

interface Props {
	initialUser?: User;
}

export const UserProvider: FC<Props> = ({ initialUser, children }) => {
	const [user, setUser] = useState(initialUser);

	return (
		<UserContextImpl.Provider value={{ user, setUser }}>
			{children}
		</UserContextImpl.Provider>
	)
}