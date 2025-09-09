import { ReactElement } from "react"

interface ButtonProps {
    variant: "primary" | "secondary",
    text: string,
    startIcon?: ReactElement,
    onClick?: ()=>void,
    fullW?: boolean,
    loading?: boolean,
    className?: string
}

const variantClasses = {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-200 text-purple-600"
}

const defaultStyles = "px-4 py-2 rounded-md font-light flex items-center cursor-pointer transition-all duration-200 hover:shadow-md active:scale-[0.98]"

export function Button({variant,text,startIcon,onClick,fullW,loading,className}: ButtonProps) {
    return <button className={variantClasses[variant] + " " + defaultStyles + `${fullW ? " w-full flex justify-center items-center": ""} ${loading ? "opacity-45 ": ""}` + (className ? ` ${className}` : "")} disabled={loading} onClick={onClick}>
        <div className="pr-2">
            {startIcon}
        </div>
        {text}
    </button>
}
