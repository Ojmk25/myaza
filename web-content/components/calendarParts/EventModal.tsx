"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { Event } from "../../types/event"

interface EventModalProps {
  event: Event | null
  onClose: () => void
  onCreate: (event: Event) => void
  onEdit: (event: Event) => void
  onDelete: (eventId: string) => void
}

const EventModal = ({ event, onClose, onCreate, onEdit, onDelete }: EventModalProps) => {
  const [title, setTitle] = useState("")
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")

  useEffect(() => {
    if (event) {
      setTitle(event.title)
      setStart(formatDateTimeForInput(event.start))
      setEnd(formatDateTimeForInput(event.end))
    } else {
      setTitle("")
      setStart("")
      setEnd("")
    }
  }, [event])

  const formatDateTimeForInput = (date: Date) => {
    return date.toISOString().slice(0, 16)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newEvent: Event = {
      id: event ? event.id : Date.now().toString(),
      title,
      start: new Date(start),
      end: new Date(end),
    }
    if (event) {
      onEdit(newEvent)
    } else {
      onCreate(newEvent)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">{event ? "Edit Event" : "Create Event"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="start" className="block text-sm font-medium text-gray-700">
              Start
            </label>
            <input
              type="datetime-local"
              id="start"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="end" className="block text-sm font-medium text-gray-700">
              End
            </label>
            <input
              type="datetime-local"
              id="end"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            {event && (
              <button
                type="button"
                onClick={() => onDelete(event.id)}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              {event ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EventModal

