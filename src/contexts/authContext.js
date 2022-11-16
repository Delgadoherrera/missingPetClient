import { createContext, useCallback, useState, useMemo, useContext } from "react";
import axios from 'axios'
import PropTypes from 'prop-types'
/* import bcrypt from 'bcryptjs' */



const MY_AUTH_APP = 'MY_AUTH_APP'
export const AuthContext = createContext();
/* const salt = bcrypt.genSaltSync(10)
 */
export function AuthContextProvider({ children }) {

    const [isAuthenticated, setIsAuthenticated] = useState(window.localStorage.getItem(MY_AUTH_APP) ?? false);


    const login = useCallback(function (datos) {
        setIsAuthenticated(true);
        window.localStorage.setItem(MY_AUTH_APP, true);
    }, []);


    const logout = useCallback(function () {
        setIsAuthenticated(0);
        window.localStorage.removeItem(MY_AUTH_APP);
    }, []);


    const value = useMemo(() => ({
        login,
        logout,
        isAuthenticated,
    }),
        [login, logout, isAuthenticated]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthContextProvider.propTypes = {
    children: PropTypes.object
};

export function useAuthContext() {
    return useContext(AuthContext);

}

