import { createContext, useEffect, useState } from "react"
import { auth } from "../../firebase/config"
import { User as FirebaseUser, signInWithPopup, GoogleAuthProvider, onIdTokenChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import User from "../../model/User"
import router from "next/router";
import Cookies from "js-cookie"

interface AuthContextProps {
    user?: User
    loading?: boolean
    loginWithGoogle?: () => Promise<void>
    signup?: (email: string, password: string) => Promise<void>
    login?: (email: string, password: string) => Promise<void>
    logout?: () => Promise<void>
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

function manageCookie(loggedIn: boolean) {
    if(loggedIn){
        Cookies.set("admin-panel-auth", loggedIn, {
            expires: 7
        })
    }else {
        Cookies.remove("admin-panel-auth")
    }
}

export function AuthProvider(props) {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User>(null)

    async function configSession(firebaseUser: FirebaseUser) {
        if(firebaseUser?.email){
            const user = await normalizedUser(firebaseUser);
            setUser(user);
            manageCookie(true);
            setLoading(false);
            return user.email;
        } else {
            setUser(null);
            manageCookie(false)
            setLoading(false);
            return false;
        }
    }

    async function loginWithGoogle() {
        try {
            setLoading(true)
            const response = await signInWithPopup(auth,
                new GoogleAuthProvider()
            )
            
            await configSession(response.user);
            router.push("/")
        } finally {
            setLoading(false)
        }
    }

    async function login(email, password) {
        try {
            setLoading(true)
            const response = await signInWithEmailAndPassword(auth, email, password)

            await configSession(response.user);
            router.push("/")
        } finally {
            setLoading(false)
        }
    }

    async function signup(email, password) {
        try {
            setLoading(true)
            const response = await createUserWithEmailAndPassword(auth, email, password)

            await configSession(response.user);
            router.push("/")
        } finally {
            setLoading(false)
        }
    }

    async function logout() {
        try {
            setLoading(true)
            await signOut(auth);
            await configSession(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if(Cookies.get("admin-panel-auth")){
            const unsubscribe = onIdTokenChanged(auth, configSession)
            return () => unsubscribe();
        } else {
            setLoading(false);
        }
    }, [])
    

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            loginWithGoogle,
            login,
            signup,
            logout,
        }}>
            {props.children}
        </AuthContext.Provider> 
    )
} 

export default AuthContext;