import { Plus } from "lucide-react"

interface FloatingActionButtonProps {
  onClick: () => void
}

export default function FloatingActionButton({ onClick }: FloatingActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed right-4 bottom-4 w-14 h-14 bg-purple-600 text-white rounded-full shadow-lg flex items-center justify-center md:hidden hover:bg-purple-700 transition-colors"
    >
      <Plus className="w-6 h-6" />
    </button>
  )
}

