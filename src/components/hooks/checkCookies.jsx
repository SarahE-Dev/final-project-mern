import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { AuthContextConsumer } from "../../context/AuthContext";
import axios from "axios";




function checkAuthCookie(){
    const {dispatch} = AuthContextConsumer()
    function checkIfCookieExists(){
        const cookie = Cookie.get('music-app-cookie');
        return cookie ? true : false
    }
    const getUserData=async(id)=>{
        try {
            const userData = await axios.get(`http://localhost:3002/api/user/get-user-info/${id}`)
            dispatch({type: 'SET_PLAYLISTS_AND_FAVORITES', payload: {
                favorites: userData.data.user.favorites,
                playlists: userData.data.user.playlists
            }})
        } catch (error) {
            console.log(user);
        }
    }
    function logUserIn(){
        if(checkIfCookieExists()){
            const jwtDecoded = jwtDecode(Cookie.get('music-app-cookie'));
            getUserData(jwtDecoded.id)
            dispatch({
                type: 'LOGIN',
                payload: {
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