import { CloseCircle, TickCircle } from "iconsax-react"

export const SuccessSlideIn = ({ openModal, successRes, closeModal }: { openModal: boolean, successRes: string, closeModal: () => void }) => {
  return (
    <div className={`flex bg-cs-success-bg fixed top-3 transition-all ${openModal && successRes === "success" ? "right-[30px]" : "right-[-200%]"} min-w-[344px] duration-500`}>
      <div className=" w-1 bg-[#30B42D]"></div>
      <div className="p-4 flex w-full justify-between">
        <div className="flex gap-x-2">
          <TickCircle size="24" color="#30B42D" variant="Bold" />
          <div>
            <h5 className=" font-semibold text-sm text-cil-neutral-900">Successful</h5>
            <p className="text-cil-blue-600 text-sm">Login successful</p>
          </div>
        </div>
        <CloseCircle size="24" color="#121826" onClick={closeModal} className=" cursor-pointer" />
      </div>
    </div>
  )
}