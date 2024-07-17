import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import closeIcon from "@/public/assets/images/closeIcon.svg";
import { AuthInput } from "../auth/AuthInput";
import appleIcon from "@/public/assets/images/appleIcon.svg";
import googleIcon from "@/public/assets/images/googleIcon.svg";
import avatar from "@/public/assets/images/avatar.png";
import { SubmitButton } from "../auth/SubmitButton";
import {
  IsAuthenticated,
  getClientInfo,
  getNameAbbreviation,
  updateUserFnc,
  uploadImageFile,
  uploadMediaFnc,
} from "@/services/authService";
import { extractAfterLastSlashOrFull } from "@/utils/Validators";
import LoadingScreen from "./LoadingScreen";

export interface UploadMediaPayload {
  media_type: File & { type: "image/jpeg" | "image/png" | "image/jpg" };
}
const Settings = ({ onClose }: { onClose: () => void }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>();
  const [loading, setLoading] = useState(false);
  useEffect(() => setLoggedIn(IsAuthenticated()), []);
  const { first_name, surname, email, picture } = getClientInfo();
  const [newFile, setNewFile] = useState<File | null>();

  const handleSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      try {
        setLoading(true);
        const data = await uploadMediaFnc({
          media_type: extractAfterLastSlashOrFull(file?.type as string),
        });
        const { signed_url, photo_url } = data.data.body.data;
        const updatePayload = {
          given_name: `${first_name}`,
          family_name: `${surname}`,
          email: `${email}`,
          picture: photo_url,
        };
        await updateUserFnc(updatePayload);

        await uploadImageFile(signed_url, file);
      } catch (error) {
        console.log(error);
      } finally {
        console.log("uploaded successfully");
        setNewFile(file);
        setLoading(false);
      }
    }
  };

  if (loggedIn !== null && loggedIn) {
    return (
      <div className="fixed inset-0 z-10 overflow-y-auto modal">
        <div className="flex items-center justify-center min-h-screen pt-4 pb-20 text-center">
          <div className="fixed inset-0 transition-opacity bg-cs-modal-100"></div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
          <div className="inline-block pt-5 pb-4 text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:align-middle sm:w-full sm:max-w-[606px]">
            <div className=" flex justify-between border-b border-solid border-cs-grey-55 mx-6 pb-4">
              <h3 className=" text-2xl font-semibold text-cs-grey-dark mb-1">
                Settings
              </h3>
              <Image
                src={closeIcon}
                alt="close"
                onClick={onClose}
                className=" cursor-pointer"
              />
            </div>
            <div className=" mx-auto my-3">
              {picture && picture !== "" ? (
                <Image
                  src={picture as string}
                  width={80}
                  height={80}
                  alt="avatar"
                  className="rounded-full w-20 h-20 object-cover mx-auto"
                />
              ) : (
                <div className=" bg-cs-grey-800 w-[80px] h-[80px] rounded-full flex justify-center items-center text-cs-grey-55 font-semibold text-[28px] m-auto">
                  {getNameAbbreviation()}
                </div>
              )}
              <form className=" relative mx-auto">
                <h3 className=" text-sm font-medium text-cs-purple-650 text-center underline cursor-pointer mx-auto block">
                  Change image
                </h3>

                <input
                  type="file"
                  accept="image/jpeg, image/png, image/jpg"
                  className=" top-0 right-[56px] cursor-pointer opacity-0 files absolute"
                  name="image"
                  onChange={handleSubmit}
                />
              </form>
            </div>
            <div className="px-6">
              <AuthInput
                label="First name"
                action={() => {}}
                errorMessage=""
                inputType="text"
                inputName="firstName"
                placeHolder="First name"
                defaultValue={first_name}
              />
              <AuthInput
                label="Last name"
                action={() => {}}
                errorMessage=""
                inputType="text"
                inputName="last"
                placeHolder="Last name"
                defaultValue={surname}
              />
              <AuthInput
                label="Email"
                action={() => {}}
                errorMessage=""
                inputType="email"
                inputName="email"
                placeHolder="email"
                value={email}
                disabledOpt={true}
              />
            </div>
            <div className="flex justify-end gap-x-2 px-6 mt-4">
              <button
                className=" bg-cs-grey-60-light text-cs-grey-100 py-4 px-4 rounded-[10px] w-36"
                onClick={onClose}
              >
                Cancel
              </button>
              <button className="bg-cs-purple-650  text-cs-grey-50 py-4 px-4 rounded-[10px] w-36 hover:bg-cs-purple-650/80">
                Create
              </button>
            </div>
          </div>
        </div>
        {loading && <LoadingScreen />}
      </div>
    );
  } else {
    return (
      <div className="fixed inset-0 z-10 overflow-y-auto modal">
        <div className="flex items-center justify-center min-h-screen pt-4 pb-20 text-center">
          <div className="fixed inset-0 transition-opacity bg-cs-modal-100"></div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
          <div className="inline-block pt-5 pb-4 text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:align-middle sm:w-full sm:max-w-[606px]">
            <div className=" flex justify-between border-b border-solid border-cs-grey-55 mx-6 pb-4">
              <h3 className=" text-2xl font-semibold text-cs-grey-dark mb-1">
                Settings
              </h3>
              <Image
                src={closeIcon}
                alt="close"
                onClick={onClose}
                className=" cursor-pointer"
              />
            </div>
            <div className=" mx-auto my-3">
              {/* <Image
                src={avatar}
                alt="image"
                className="rounded-full w-20 h-20 object-cover mx-auto"
              /> */}
              <h3 className=" text-sm font-medium text-cs-purple-650 text-center">
                Change image
              </h3>
            </div>
            <form className="px-6" id="guest">
              <AuthInput
                label="First name"
                action={() => {}}
                errorMessage=""
                inputType="text"
                inputName="firstName"
                placeHolder="First name"
                defaultValue="firstOne"
              />
              <AuthInput
                label="Last name"
                action={() => {}}
                errorMessage=""
                inputType="text"
                inputName="lasttName"
                placeHolder="Last name"
              />
              <AuthInput
                label="Email"
                action={() => {}}
                errorMessage=""
                inputType="email"
                inputName="email"
                placeHolder="email"
              />
            </form>

            <div className="flex justify-end gap-x-2 px-6 mt-4">
              <button
                className=" bg-cs-grey-60-light text-cs-grey-100 py-4 px-4 rounded-[10px] w-36"
                onClick={onClose}
              >
                Cancel
              </button>
              <button className="bg-cs-purple-650  text-cs-grey-50 py-4 px-4 rounded-[10px] w-36 hover:bg-cs-purple-650/80">
                Create
              </button>
            </div>
          </div>
        </div>
        {loading && <LoadingScreen />}
      </div>
    );
  }
};

export default Settings;
