import { CloseCircle, Danger } from "iconsax-react"

export const FailureSlideIn = ({ openModal, successRes, closeModal }: { openModal: boolean, successRes: string, closeModal: () => void }) => {
  return (
    <div className={`flex bg-cs-error-50 fixed top-9 transition-all ${openModal && successRes === "failed" ? "right-[30px]" : "right-[-200%]"} min-w-[344px] duration-500`}>
      <div className=" w-1 bg-[#8D2822]"></div>
      <div className="p-4 flex w-full justify-between">
        <div className="flex gap-x-2">
          <Danger size="24" color="#DE524C" variant="Bold" />
          <div>
            <h5 className=" font-semibold text-sm text-cil-neutral-900">Error</h5>
            <p className="text-cil-blue-600 text-sm">Opps! Network Error. Try again</p>
          </div>
        </div>
        <CloseCircle size="24" color="#121826" onClick={closeModal} className=" cursor-pointer" />
      </div>
    </div>
  )
}