import { ChevronLeft, ChevronRight } from "lucide-react"

interface HeaderProps {
  currentDate: Date
  onDateChange: (date: Date) => void
}

const Header = ({ currentDate, onDateChange }: HeaderProps) => {
  const navigateWeek = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7))
    onDateChange(newDate)
  }

  return (
    <header className="flex items-center justify-between p-4 bg-white border-b border-solid">
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100" onClick={() => navigateWeek("prev")}>
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100" onClick={() => navigateWeek("next")}>
          <ChevronRight className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold">
          {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </h2>
      </div>
      <div>
        <button
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          onClick={() => onDateChange(new Date())}
        >
          Today
        </button>
      </div>
    </header>
  )
}

export default Header

