import { ArrowRight } from "iconsax-react";

export const SubmitButton = ({ text, action, activate }: { text: string, action: () => void, activate: boolean }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        action()
      }}
      className={` w-full h-[48px] ${activate ? "bg-cs-purple-650 text-white" : "bg-cs-grey-55 text-cs-grey-500"} hover:opacity-90 flex justify-center items-center gap-x-2 font-bold mt-12 rounded-[10px]`}
      disabled={!activate}
    >
      {text}
    </button>
  )
}