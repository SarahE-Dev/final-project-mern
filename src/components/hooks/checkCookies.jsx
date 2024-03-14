import { useContext } from "react";
import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";

import { AppContext } from "../../context/AuthContext";
import { AuthContextConsumer } from "../../context/AuthContext";


function checkAuthCookie(){
    const {dispatch} = AuthContextConsumer()
    function checkIfCookieExists(){
        const cookie = Cookie.get('music-app-cookie');
        return cookie ? true : false
    }
    function logUserIn(){
        if(checkIfCookieExists()){
            const jwtDecoded = jwtDecode(Cookie.get('music-app-cookie'));
            dispatch({
                type: 'LOGIN',
                user: {
                        username: jwtDecoded.username,
                        email: jwtDecoded.email,
                        id: jwtDecoded.id
                }
                
            })
        }
    }
    return {checkIfCookieExists, logUserIn}
    
}

export default checkAuthCookie