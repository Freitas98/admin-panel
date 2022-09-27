import Header from "./Header"
import SideMenu from "./SideMenu"
import Content from "./Content"
import useAppData from "../../data/hook/useAppData"

interface LayoutProps {
    title: string
    subtitle: string
    children?: any
}

export default function Layout(props: LayoutProps) {
    const { theme, changeTheme } = useAppData();
    
    return (
        <div className={`
            ${theme}
            flex h-screen w-screen
        `}>
            <SideMenu />
            <div className={`
                flex flex-col 
                bg-gray-300 dark:bg-gray-800
                p-7 w-full
            `}>
                <Header title={props.title} subtitle={props.subtitle}/>
                <Content>
                    {props.children}
                </Content>
            </div>
        </div>
    )
}