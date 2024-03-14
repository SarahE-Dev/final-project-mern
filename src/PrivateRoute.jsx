import React, {useContext} from 'react';
import { Route, Navigate } from 'react-router';
import checkAuthCookie from './components/hooks/checkCookies';

const PrivateRoute = ({children}) =>{
    const {checkIfCookieExists} = checkAuthCookie()
    if(checkIfCookieExists()){
        return children
    }else{
        return <Navigate to='/login' />
    }
}

export default PrivateRoute
