import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YouTubeIcon } from "../icons/YoutubeIcon";
import { InstagramIcon } from "../icons/InstagramIcon";
import { TextIcon } from "../icons/TextIcon";
import { DocumentIcon } from "../icons/DocumentIcon";
import { SidebarItem } from "./SidebarItem";

export function SideBar({ selected, onSelect }: {
    selected: "all" | "twitter" | "youtube" | "instagram" | "text" | "document",
    onSelect: (v: "all" | "twitter" | "youtube" | "instagram" | "text" | "document") => void
}) {
    return <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6">
        <div className="text-2xl flex pt-8">
            <div className="pr-2 text-purple-600">
                <Logo />
            </div>
            Brainly
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
