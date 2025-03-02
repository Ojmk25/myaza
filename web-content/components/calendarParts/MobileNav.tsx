import { ChevronLeft, ChevronRight } from "lucide-react"

interface MobileNavProps {
  onOpenSidebar: () => void
  currentDate: Date
  onNavigate: (direction: "prev" | "next") => void
}

export default function MobileNav({ onOpenSidebar, currentDate, onNavigate }: MobileNavProps) {
  return (
    <div className="flex flex-col bg-white border-b md:hidden">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-xl font-bold text-purple-600">CecureStream</h1>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg" onClick={() => onNavigate("prev")}>
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg" onClick={() => onNavigate("next")}>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="px-4 pb-3">
        <h2 className="text-lg font-semibold text-gray-900">
          {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
        </h2>
      </div>
    </div>
  )
}

