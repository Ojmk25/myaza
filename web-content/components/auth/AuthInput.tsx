import { EyeSlash } from "iconsax-react";
import { useState } from "react";

export const AuthInput = ({
  label,
  action,
  errorMessage,
  inputType,
  inputName,
  placeHolder,
  value,
  defaultValue,
  disabledOpt,
}: {
  label: string;
  action: (input: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage: string;
  inputType: string;
  inputName: string;
  placeHolder: string;
  value?: string;
  defaultValue?: string;
  disabledOpt?: boolean;
}) => {
  const [checkPassword, setCheckPassword] = useState(false);

  return (
    <>
      {inputType === "password" ? (
        <div className="flex flex-col mt-2">
          <label
            htmlFor={inputName}
            className=" text-sm font-medium text-cs-grey-100 metro-medium"
          >
            {label}
          </label>
          <div>
            <div className="relative">
              <input
                onChange={(e) => action(e)}
                type={checkPassword ? "text" : "password"}
                name={inputName}
                className="h-[48px] px-[16px] pt-[10px] pb-[13px] border-[#9F9F9F] border w-full placeholder:text-[#898989] placeholder:text-sm rounded-[10px] outline-none"
                placeholder={placeHolder}
                id={inputName}
                value={value}
              />
              <EyeSlash
                size="18"
                color="#636C7E"
                className="absolute top-[16px] right-[16px] cursor-pointer"
                onClick={() => {
                  setCheckPassword(!checkPassword);
                }}
              />
            </div>
            <p className="text-xs text-cs-error-500 min-h-4">{errorMessage}</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col mt-2 w-full">
          <label
            htmlFor={inputName}
            className=" text-sm font-medium text-cs-grey-100 metro-medium"
          >
            {label}
          </label>
          <input
            onChange={(e) => action(e)}
            type={inputType}
            name={inputName}
            className={`h-[48px] px-[16px] pt-[10px] pb-[13px] border-[#9F9F9F] border rounded-[10px] w-full placeholder:text-[#898989] placeholder:text-sm outline-none ${
              disabledOpt && "bg-[#DFDFDF] border-[#B4B4B4]"
            }`}
            placeholder={placeHolder}
            id={inputName}
            value={value}
            defaultValue={defaultValue}
            disabled={disabledOpt}
          />
          <p className="text-xs text-cs-error-500 min-h-4">{errorMessage}</p>
        </div>
      )}
    </>
  );
};
