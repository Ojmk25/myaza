"use client"

import { X } from "lucide-react"
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { updateCalendarSettings } from "@/services/meetingServices"
import { getCurrentClientData } from "@/services/authService"
import LoadingScreen from "@/components/modals/LoadingScreen"
import { useAuth } from "@frontegg/nextjs"

interface SettingsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultSettings?: Settings
}

interface Settings {
  language: string
  country: string
  use24Hour: boolean
  timezone: string
  videoEnabled: boolean
  soundEnabled: boolean
}

export default function SettingsModal({ open, onOpenChange, defaultSettings }: SettingsModalProps) {
  const loggedInUser = getCurrentClientData()
  const [loading, setLoading] = useState(false)
  const [settings, setSettings] = useState<Settings>({
    language: "en-GB",
    country: "NG",
    use24Hour: false,
    timezone: "GMT+1",
    videoEnabled: true,
    soundEnabled: true,
  })
   const { user  } = useAuth();

  useEffect(() => {
    if (defaultSettings) {
      setSettings(defaultSettings)
    }
  }, [defaultSettings]) // Added defaultSettings to dependencies

  const handleSave = async () => {
    setLoading(true)
    try {
      // const data = await updateCalendarSettings(settings, loggedInUser.token)
      const data = await updateCalendarSettings(settings, user?.accessToken as string)
      if (data?.data.statusCode === 200) {
        typeof window !== "undefined" && window.location.reload()
      }
    } catch (error) {
      console.error("Error saving settings:", error)
    } finally {
      setLoading(false)
    }
    onOpenChange(false)
  }

  return (
    <>
      {loading && <LoadingScreen />}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Calendar settings</DialogTitle>
            <button
              onClick={() => onOpenChange(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </DialogHeader>

          <div className="py-6">
            {/* Desktop Layout */}
            <div className="hidden md:block space-y-8">
              {/* Language & Region Section */}
              <div className="grid grid-cols-[100px_1fr] items-start gap-8">
                <h3 className="text-sm font-medium text-gray-900">Language & Region</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select
                      value={settings.language}
                      onValueChange={(value) => setSettings({ ...settings, language: value })}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en-GB">English (UK)</SelectItem>
                        <SelectItem value="en-US">English (US)</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Country</Label>
                    <Select
                      value={settings.country}
                      onValueChange={(value) => setSettings({ ...settings, country: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NG">Nigeria</SelectItem>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="GB">United Kingdom</SelectItem>
                        <SelectItem value="FR">France</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Time Section */}
              <div className="grid grid-cols-[100px_1fr] items-start gap-8">
                <h3 className="text-sm font-medium text-gray-900">Time</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Use 24hr time format</Label>
                    <Switch
                      checked={settings.use24Hour}
                      onCheckedChange={(checked) => setSettings({ ...settings, use24Hour: checked })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <Select
                      value={settings.timezone}
                      onValueChange={(value) => setSettings({ ...settings, timezone: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GMT+1">GMT+1</SelectItem>
                        <SelectItem value="GMT+0">GMT+0</SelectItem>
                        <SelectItem value="GMT-5">GMT-5 (EST)</SelectItem>
                        <SelectItem value="GMT-8">GMT-8 (PST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Audio/Video Section */}
              <div className="grid grid-cols-[100px_1fr] items-start gap-8">
                <h3 className="text-sm font-medium text-gray-900">Audio/Video</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Turn video on during session</Label>
                    <Switch
                      checked={settings.videoEnabled}
                      onCheckedChange={(checked) => setSettings({ ...settings, videoEnabled: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Turn sound on during session</Label>
                    <Switch
                      checked={settings.soundEnabled}
                      onCheckedChange={(checked) => setSettings({ ...settings, soundEnabled: checked })}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900">Language & Region</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select
                      value={settings.language}
                      onValueChange={(value) => setSettings({ ...settings, language: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en-GB">English (UK)</SelectItem>
                        <SelectItem value="en-US">English (US)</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Country</Label>
                    <Select
                      value={settings.country}
                      onValueChange={(value) => setSettings({ ...settings, country: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NG">Nigeria</SelectItem>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="GB">United Kingdom</SelectItem>
                        <SelectItem value="FR">France</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900">Time</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Use 24hr time format</Label>
                    <Switch
                      checked={settings.use24Hour}
                      onCheckedChange={(checked) => setSettings({ ...settings, use24Hour: checked })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <Select
                      value={settings.timezone}
                      onValueChange={(value) => setSettings({ ...settings, timezone: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GMT+1">GMT+1</SelectItem>
                        <SelectItem value="GMT+0">GMT+0</SelectItem>
                        <SelectItem value="GMT-5">GMT-5 (EST)</SelectItem>
                        <SelectItem value="GMT-8">GMT-8 (PST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900">Audio/Video</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Turn video on during session</Label>
                    <Switch
                      checked={settings.videoEnabled}
                      onCheckedChange={(checked) => setSettings({ ...settings, videoEnabled: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Turn sound on during session</Label>
                    <Switch
                      checked={settings.soundEnabled}
                      onCheckedChange={(checked) => setSettings({ ...settings, soundEnabled: checked })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t">
            <button
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 text-sm font-medium bg-gray-50 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm font-medium bg-cs-purple-650 text-white hover:bg-purple-700 rounded-lg"
            >
              {loading ? "Loading..." : "Save settings"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

