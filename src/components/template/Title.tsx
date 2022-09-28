interface TitleProps {
    title: string
    subtitle: string
}

export default function Title(props: TitleProps) {
    return (
        <div>
           <h1 className={`
                font-black text-md md:text-3xl 
                text-gray-900 dark:text-gray-100
           `}>
                {props.title}
            </h1>
           <h2 className={`
                font-light text-xs md:text-sm
                dark:text-gray-300
                mt-3
           `}>
                {props.subtitle}
            </h2>
        </div>
    )
}