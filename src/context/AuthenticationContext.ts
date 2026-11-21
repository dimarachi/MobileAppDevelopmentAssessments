import { createContext } from 'react';
import { User } from '../types/User';

//Shape of the data shared by the authentication context
export type AuthenticationContextObject = {
    value: User;
    setValue: (newValue: User | undefined) => void;
};

//Shares the logged in user with every screen of the app
export const AuthenticationContext = createContext<AuthenticationContextObject | null>(null);
