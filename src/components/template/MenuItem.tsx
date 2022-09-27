import Link from "next/link"

interface MenuItemProps {
    text: string
    icon: any
    url?: string
    className?: string
    onClick?: (evento: any) => void
}

export default function MenuItem(props: MenuItemProps) {
    
    function renderContent() {
        return (
            <a className={`
                flex flex-col justify-center items-center
                h-20 w-20
                text-gray-600
                ${props.className}
            `}>
                {props.icon}
                <span className={`
                    text-xs font-light 
                `}>
                    {props.text}
                </span>
            </a>
        )
    }
    
    return (
        <li onClick={props.onClick} className={`
            hover:bg-gray-100
            cursor-pointer
        `}>
            {props.url ? (
                <Link href={props.url}>
                    {renderContent()}
                </Link>
            ) : (
                renderContent()
            )}
        </li>
    )
}