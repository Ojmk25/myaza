import { Globe } from "lucide-react";

interface TimezoneSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TimezoneSelect({
  value,
  onChange,
}: TimezoneSelectProps) {
  // This is a simplified list of timezones. In production, you'd want a complete list
  const timezones = [
    "GMT",
    "GMT+1",
    "GMT+0",
    "UTC",
    "GMT-5 EST",
    "GMT-8 PST",
    "CST",
    "IST",
  ];

  return (
    <div className="flex items-center">
      <Globe className="w-3 h-4 text-gray-500" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-sm border-0 bg-transparent text-gray-600 font-medium cursor-pointer hover:bg-gray-100 focus:ring-0 focus:outline-none"
      >
        {timezones.map((tz) => (
          <option key={tz} value={tz}>
            {tz}
          </option>
        ))}
      </select>
    </div>
  );
}
