import Image from "next/image";
import router from "next/router";
import loadingImage from "../../../public/images/loading.gif";
import useAuth from "../../data/hook/useAuth";

export default function ForceAuthentication(props) {

    const { user, loading } = useAuth();
    
    function renderContent() {
        return (
            <>
                {props.children}
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