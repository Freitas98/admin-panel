import Head from "next/head"
import useAppData from "../../data/hook/useAppData"
import ChangeThemeButton from "./ChangeThemeButton"
import Title from "./Title"
import UserAvatar from "./UserAvatar"

interface HeaderProps {
    title: string
    subtitle: string
}

export default function Header(props: HeaderProps) {
    const { theme, changeTheme } = useAppData()
    
    return (
        <div className={`
            flex
        `}>
            <Head>
                <title>{props.title}</title>
            </Head>
            <Title title={props.title} subtitle={props.subtitle} />
            <div className={` 
                flex flex-grow justify-end items-center
            `}>
                <ChangeThemeButton theme={theme} changeTheme={changeTheme}/>
                <UserAvatar className="ml-3"/>
            </div>
        </div>
    )
}