import { useState } from "react";

interface DropdownOption {
  label: string;
  onClick: () => void;
}

interface DropdownButtonProps {
  buttonLabel: string;
  options: DropdownOption[];
}

export default function DropdownButton({ buttonLabel, options }: DropdownButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hidden lg:flex items-center justify-center w-[169px] h-[38px] bg-cs-purple-650 text-white rounded-lg hover:bg-cs-purple-500"
      >
        {buttonLabel}
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-[169px] bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => {
                setIsOpen(false);
                option.onClick();
              }}
              className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
