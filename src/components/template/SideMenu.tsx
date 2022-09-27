import { BellIcon, HomeIcon, LogoutIcon, SettingsIcon } from "./icons";
import Logo from "./Logo";
import MenuItem from "./MenuItem";

export default function SideMenu() {
    return (
        <aside className={`flex flex-col`}>
            <div className={`
            flex flex-col items-center justify-center
            bg-gradient-to-r from-indigo-500 to-purple-800
                h-20 w-20
            `}>
                <Logo />
            </div>
            <ul className={`flex-grow`}>
                <MenuItem url="/" text="Início" icon={HomeIcon}/>
                <MenuItem url="/settings" text="Ajustes" icon={SettingsIcon}/>
                <MenuItem url="/notifications" text="Notificações" icon={BellIcon}/>
            </ul>
            <ul>
                <MenuItem 
                    onClick={() => console.log("logout")}
                    text="Sair" 
                    icon={LogoutIcon}
                    className="text-red-600 hover:bg-red-400 hover:text-white"
                />
            </ul>
        </aside>
    )
}