import React, { createContext, useState } from 'react';
import moment from 'moment'

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({children}) => {

    const [authState, setAuthState] = useState({
        username: null,
        expiresAt: null,
        authorities: []
    });

    const setAuthInfo = (data) => {
        setAuthState(data);
    }

    const isAuthenticated = () => {
        if(authState.username == null || authState.expiresAt == null){
            return false;
        }
        if(moment(authState.expiresAt).isBefore()){
            return false;
        }
        return true;
    }

    return(
    <Provider 
       value={{
         authState ,
         setAuthState: authInfo => setAuthInfo(authInfo),
           isAuthenticated
    }}>
      {children}
    </Provider>);
}

export {AuthContext, AuthProvider};