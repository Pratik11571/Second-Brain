import { ShareIcon } from "../icons/ShareIcon";

interface CardProps {
    title: string,
    link: string,
    type: "twitter" | "youtube" | "instagram" | "text" | "document"
}

export function Card({ title, link, type }: CardProps) {
    const isDoc = type === "document";
    return <div>
        <div className="p-4 bg-white rounded-md border-gray-200 max-w-72 border min-h-48 min-w-72 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
            <div className="flex justify-between">
                <div className="flex items-center text-md">
                    <div className="text-gray-500 pr-2">
                        <ShareIcon />
                    </div>
                    {title}
                </div>
                <div className="flex items-center">
                    <div className="pr-2 text-gray-500">
                        <a href={link} target="_blank" rel="noreferrer">
                            <ShareIcon />
                        </a>
                    </div>
                    <button className="text-gray-500" onClick={() => navigator.clipboard.writeText(link)}>
                        <ShareIcon />
                    </button>
                </div>
            </div>

            <div className="pt-4">
                {type === "youtube" && (
                  <iframe className="w-full" src={link.replace("watch","embed").replace("?v=","/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                )}
                {type === "twitter" && (
                  <blockquote className="twitter-tweet">
                    <a href={link.replace("x.com","twitter.com")}></a>
                  </blockquote>
                )}
                {type === "instagram" && (
                  <blockquote className="instagram-media" data-instgrm-permalink={link} data-instgrm-version="14">
                    <a href={link}></a>
                  </blockquote>
                )}
                {type === "text" && (
                  <p className="text-gray-700 whitespace-pre-wrap break-words">{link}</p>
                )}
                {isDoc && (
                  <a className="text-purple-600 underline" href={link} target="_blank" rel="noreferrer">Open document</a>
                )}
            </div>
        </div>
    </div>
}
