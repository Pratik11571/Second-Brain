import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YouTubeIcon } from "../icons/YoutubeIcon";
import { InstagramIcon } from "../icons/InstagramIcon";
import { TextIcon } from "../icons/TextIcon";
import { DocumentIcon } from "../icons/DocumentIcon";
import { SidebarItem } from "./SidebarItem";
import { CrossIcon } from "../icons/CrossIcon";

export function SideBar({ selected, onSelect, className = "", onClose }: {
    selected: "all" | "twitter" | "youtube" | "instagram" | "text" | "document",
    onSelect: (v: "all" | "twitter" | "youtube" | "instagram" | "text" | "document") => void,
    className?: string,
    onClose?: () => void
}) {
    return <div className={`h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6 ${className}`}>
        <div className="text-2xl flex pt-8 justify-between pr-4">
            <div className="flex items-center">
                <div className="pr-2 text-purple-600">
                    <Logo />
                </div>
                Brainly
            </div>
            {onClose && (
                <button aria-label="Close" className="text-gray-600 hover:text-gray-900" onClick={onClose}>
                    <CrossIcon />
                </button>
            )}
        </div>
        <div className="pt-8 pl-4 space-y-1 pr-4">
            <SidebarItem text="All" icon={<span className="size-6" />} active={selected === "all"} onClick={() => onSelect("all")} />
            <SidebarItem text="Twitter" icon={<TwitterIcon />} active={selected === "twitter"} onClick={() => onSelect("twitter")} />
            <SidebarItem text="Youtube" icon={<YouTubeIcon />} active={selected === "youtube"} onClick={() => onSelect("youtube")} />
            <SidebarItem text="Instagram" icon={<InstagramIcon />} active={selected === "instagram"} onClick={() => onSelect("instagram")} />
            <SidebarItem text="Text" icon={<TextIcon />} active={selected === "text"} onClick={() => onSelect("text")} />
            <SidebarItem text="Document" icon={<DocumentIcon />} active={selected === "document"} onClick={() => onSelect("document")} />
        </div>
    </div>
}
