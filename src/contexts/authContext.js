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
    const [userData, setUserData] = useState(null)


    const login = useCallback(function (datos) {
        setUserData(datos)
        sendData()
    }, [userData]);



    const sendData = async () => {
        if (userData !== null) {

            userData.email !== '' ? axios.post("https://localhost:3001/user/login", userData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user: userData })
            }).then((res) => {
                console.log('res api', res)
                document.cookie = `token=${res.data.token}; max-age=${3600}; path=/; samesite-strict `
                window.localStorage.setItem('id', res.data.dataUser.id);
                window.localStorage.setItem('name', res.data.dataUser.nombre);
                window.localStorage.setItem('lastName', res.data.dataUser.apellido);
                window.localStorage.setItem('email', res.data.dataUser.email);
                window.localStorage.setItem('avatar', res.data.dataUser.fotoPerfil);
                window.localStorage.setItem(MY_AUTH_APP, true);
                setIsAuthenticated(true);
            }) : <p> </p>
        }
    }


    const logout = useCallback(function () {
        setIsAuthenticated(0);
        window.localStorage.removeItem(MY_AUTH_APP);
    }, []);


    const value = useMemo(() => ({
        login,
        logout,
        isAuthenticated,
        userData,
    }),
        [login, logout, isAuthenticated, userData]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthContextProvider.propTypes = {
    children: PropTypes.object
};

export function useAuthContext() {
    return useContext(AuthContext);

}

