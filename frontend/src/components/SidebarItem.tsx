import { ReactElement } from "react"

export function SidebarItem({ text, icon, active = false, onClick }: {
    text: string,
    icon: ReactElement,
    active?: boolean,
    onClick?: () => void
}) {
    return <button onClick={onClick} className={`flex text-gray-700 py-2 cursor-pointer rounded max-w-48 pl-4 transition-all duration-150 items-center w-full ${active ? "bg-gray-200" : "hover:bg-gray-200"}`}>
        <div className="pr-2">
            {icon}
        </div>
        <div className={`${active ? "text-purple-600" : ""}`}>
            {text}
        </div>
    </button>
}
