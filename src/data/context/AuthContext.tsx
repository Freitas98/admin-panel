import { createContext, useState } from "react"
import { app, auth } from "../../firebase/config"
import { User as FirebaseUser, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import User from "../../model/User"
import router from "next/router";

interface AuthContextProps {
    user?: User
    loginWithGoogle?: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({})

async function normalizedUser(firebaseUser: FirebaseUser): Promise<User> {
    const token = await firebaseUser.getIdToken();
    return {
        uid: firebaseUser.uid,
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        token,
        provider: firebaseUser.providerData[0].providerId,
        imageUrl: firebaseUser.photoURL
    }
}

export function AuthProvider(props) {

    const [user, setUser] = useState<User>(null)

    async function loginWithGoogle() {
        const response = await signInWithPopup(auth,
            new GoogleAuthProvider()
        )
        
        if(response.user?.email){
            const user = await normalizedUser(response.user);
            setUser(user);
    
            router.push("/")
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            loginWithGoogle
        }}>
            {props.children}
        </AuthContext.Provider> 
    )
} 

export default AuthContext;