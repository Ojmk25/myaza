import { EyeSlash } from "iconsax-react";
import { useState } from "react";

export const AuthInput = ({ label, action, errorMessage, inputType, inputName, placeHolder }: { label: string, action: (input: React.ChangeEvent<HTMLInputElement>) => void, errorMessage: string, inputType: string, inputName: string, placeHolder: string }) => {
  const [checkPassword, setCheckPassword] = useState(false);

  return (
    <>{inputType === "password" ? (
      <div className="flex flex-col mt-[24px]">
        <label htmlFor={inputName} className=" text-sm font-medium text-cs-grey-100">{label}</label>
        <div>
          <div className="relative">
            <input
              onChange={(e) => action(e)}
              type={checkPassword ? "text" : "password"}
              name={inputName}
              className="h-[48px] px-[16px] py-[13px] border-[#9F9F9F] border w-full mt-[6px] placeholder:text-[#898989] placeholder:text-sm rounded-[10px] outline-none"
              placeholder={placeHolder}
              id={inputName}
            />
            <EyeSlash size="18" color="#636C7E" className="absolute top-[21px] right-[16px] cursor-pointer" onClick={() => { setCheckPassword(!checkPassword) }} />
          </div>
          <p className="text-sm text-cs-error-500 mt-1">{errorMessage}</p>
        </div>
      </div>
    ) : (
      <div className="flex flex-col mt-[22px] w-full">
        <label htmlFor={inputName} className=" text-sm font-medium text-cs-grey-100">{label}</label>
        <input
          onChange={(e) => action(e)}
          type={inputType}
          name={inputName}
          className="h-[48px] px-[16px] py-[13px] border-[#9F9F9F] border rounded-[10px] w-full mt-[6px] placeholder:text-[#898989] placeholder:text-sm outline-none"
          placeholder={placeHolder}
          id={inputName}
        />
        <p className="text-sm text-cs-error-500 mt-1">{errorMessage}</p>
      </div>
    )}
    </>
  )
}