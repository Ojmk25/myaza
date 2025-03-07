"use client"

import type React from "react"
import { useState } from "react"
import { ChevronLeft, X } from "lucide-react"
import { AddSquare } from "iconsax-react"

interface SearchModalProps {
  onClose: () => void
  onCreateMeeting: (attendees: string[]) => void
}

// Array of background colors for email chips
const emailChipColors = [
  "bg-[#E8FFF3] text-[#0E4E2C]", // mint green
  "bg-[#FFF8E7] text-[#4E3C0E]", // light yellow
  "bg-[#F4E8FF] text-[#2E0E4E]", // light purple
  "bg-[#FFE8E8] text-[#4E0E0E]", // light red
]

export default function SearchModal({ onClose, onCreateMeeting }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEmails, setSelectedEmails] = useState<string[]>([])

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      e.preventDefault()
      if (searchTerm.includes("@")) {
        setSelectedEmails([...selectedEmails, searchTerm.trim()])
        setSearchTerm("")
      }
    }
  }

  const removeEmail = (emailToRemove: string) => {
    setSelectedEmails(selectedEmails.filter((email) => email !== emailToRemove))
  }

  return (
    <div className="fixed inset-0 bg-white z-50">
      {/* Header */}
      <div className="flex items-center justify-between h-14 px-4 border-b">
        <button onClick={onClose} className="p-2 -ml-2">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-medium absolute left-1/2 -translate-x-1/2">Search people</h1>
      </div>

      {/* Search Section */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-medium">Search people</h2>
          <button
            onClick={() => {
              if (selectedEmails.length > 0) {
                onCreateMeeting(selectedEmails)
              }
            }}
            className="flex items-center gap-1 text-purple-600 font-medium"
          >
            Create
            <AddSquare className="w-4 h-4" />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-2">Add others to a session</p>

        <input
          type="email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleInputKeyPress}
          placeholder="example@mail.com"
          className="w-full p-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-600 text-base"
        />

        <p className="text-xs text-gray-500 mt-1">*You can't view their calendar</p>

        {/* Selected Emails */}
        <div className="mt-4 space-y-2">
          {selectedEmails.map((email, index) => (
            <div
              key={email}
              className={`flex items-center justify-between p-4 rounded-xl ${
                emailChipColors[index % emailChipColors.length]
              }`}
            >
              <span className="text-sm font-medium">{email}</span>
              <button onClick={() => removeEmail(email)} className="p-1 hover:bg-black/5 rounded-full">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

