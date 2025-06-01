import { X } from "lucide-react"

export function Popup() {
    return(
        <>
        <div className="bg-green-400 opacity-70 rounded md:h-dvh md:w-2xl">
            <div className="p-0.5">
                <X className="flex justify-self-end rounded bg-amber-600 hover:bg-orange-700 hover:scale-90"/>
            </div>
        </div>
        </>
    )
}