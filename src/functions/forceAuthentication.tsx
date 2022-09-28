import Head from "next/head";
import Script from "next/script";
import Image from "next/image";
import router from "next/router";
import loadingImage from "../../public/images/loading.gif";
import useAuth from "../data/hook/useAuth";

export default function forceAuthentication(jsx) {

    const { user, loading } = useAuth();
    
    function renderContent() {
        return (
            <>
                <Script dangerouslySetInnerHTML={{
                        __html: `
                            if(!document.cookie?.includes("admin-panel-auth")){
                                window.location.href = "/authentication"
                            }
                        `
                    }}
                />
                {jsx}
            </>
        )
    }
    
    function renderLoading() {
        return (
            <div className={`
                flex justify-center items-center
                h-screen
            `}>
                <Image src={loadingImage} />
            </div>
        )
    }

    if(!loading && user?.email) {
        return renderContent()
    } else if (loading){
        return renderLoading()
    } else {
        router.push("/authentication")
        return null;
    }
}