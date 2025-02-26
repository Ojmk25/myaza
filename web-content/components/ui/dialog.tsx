import type React from "react"
export const Dialog = ({
  children,
  open,
  onOpenChange,
}: { children: React.ReactNode; open: boolean; onOpenChange: (open: boolean) => void }) => {
  return open ? (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">{children}</div>
      </div>
    </div>
  ) : null
}

export const DialogContent = ({ children }: { children: React.ReactNode }) => {
  return <div className="p-6">{children}</div>
}

export const DialogHeader = ({ children }: { children: React.ReactNode }) => {
  return <div className="mb-4">{children}</div>
}

export const DialogTitle = ({ children }: { children: React.ReactNode }) => {
  return <h2 className="text-lg font-semibold">{children}</h2>
}

