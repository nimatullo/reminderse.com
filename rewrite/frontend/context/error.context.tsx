import React, { useState } from "react";
import { useContext } from "react";

export interface ErrorContext {
	error?: string
	pushError: (error?: string) => void;
}

export const ErrorContextImpl = React.createContext<ErrorContext>(null!);

export function useError() {
	return useContext(ErrorContextImpl);
}

interface Props {
	initialError?: string;
}

export const ErrorProvider: React.FC<Props> = ({ initialError, children }) => {
	const [error, setError] = React.useState(initialError);

	return (
		<ErrorContextImpl.Provider value={{error, pushError: setError}}>
			{children}
			<p>{error}</p>
		</ErrorContextImpl.Provider>
	);
};