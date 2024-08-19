import Image from "next/image";
import React, { useEffect, useState } from "react";
import closeIcon from "@/public/assets/images/closeIcon.svg";
import { Calendar, Clock, UserAdd } from "iconsax-react";

import style from "./style.module.css";

import copyTextToClipboard from "@/utils/clipBoard";
import { generateCustomId } from "@/utils/customIDGenerator";
import { createScheduleMeeting } from "@/services/meetingServices";
import LoadingScreen from "./LoadingScreen";
import { SuccessSlideIn } from "../SuccessSlideIn";
import { FailureSlideIn } from "../FailureSlideIn";
import MeetingDetailsModal from "./MeetingDetailsModal";
import { ValidateEmail } from "@/utils/Validators";
import { timeToUnixTimestamp } from "@/utils/meetingFunctions";
import moment from "moment-timezone";

interface FormData {
  meetingName: string;
  email: string;
  emailList: string[];
  startTime: string | "12:00";
  endTime: string | "12:00";
  date: string;
}

const ScheduleMeeting = ({ onClose }: { onClose: () => void }) => {
  const [token, setToken] = useState("");
  const [tooltipMessage, setTooltipMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successRes, setSuccessRes] = useState<any>();
  const [openModal, setOpenModal] = useState(false);
  const [meetDetails, setMeetDetails] = useState<any>();
  const [openMeetingDetails, setOpenMeetingDetails] = useState(false);
  const [activateEmailButton, setActivateEmailButton] =
    useState<boolean>(false);

  useEffect(() => {
    setToken(generateCustomId());
  }, []);

  const [formData, setFormData] = useState<FormData>({
    meetingName: "",
    email: "",
    startTime: "" || "12:00",
    endTime: "" || "14:00",
    date: formatDate(new Date()),
    emailList: [],
  });

  const timeZone = moment.tz.guess(true);

  const handleInput = (input: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = input.target;
    if (name === "meetingDate") {
      setFormData((prevState) => ({
        ...prevState,
        date: formatDate(value),
      }));
    } else if (name === "email" && !ValidateEmail(value)) {
      setActivateEmailButton(true);
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setActivateEmailButton(false);
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const addEmailToList = () => {
    const { email, emailList } = formData;
    if (email && !emailList.includes(email) && ValidateEmail(email)) {
      setFormData((prev) => ({
        ...prev,
        emailList: [...prev.emailList, prev.email],
        email: "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        email: "",
      }));
    }
  };

  const removeEmail = (emailToRemove: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      emailList: prevFormData.emailList.filter(
        (email) => email !== emailToRemove
      ),
    }));
  };

  function convertTo12HourFormat(time: string): string {
    const [hourStr, minuteStr] = time.split(":");
    const hours = parseInt(hourStr, 10);
    const minutes = parseInt(minuteStr, 10);

    const period = hours >= 12 ? "PM" : "AM";

    const hours12 = hours % 12 || 12;

    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${hours12}:${formattedMinutes} ${period}`;
  }

  const handleEnterKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      addEmailToList();
      event.preventDefault();
    }
  };

  function formatDate(dateString: any): string {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const handleCopyClick = (value: string) => {
    copyTextToClipboard(
      value,
      () => {
        setTooltipMessage("copied");
        setTimeout(() => setTooltipMessage(""), 2000);
      },
      () => {
        setTooltipMessage("Failed to copy!");
        setTimeout(() => setTooltipMessage(""), 2000);
      }
    );
  };

  const handleScheduleMeeting = async () => {
    const scheduleMeetingPayload = {
      meeting_name: formData.meetingName,
      meeting_date: formData.date,
      start_time: timeToUnixTimestamp(formData.startTime),
      end_time: timeToUnixTimestamp(formData.endTime),
      timezone: timeZone,
      attendees: formData.emailList,
    };
    setLoading(true);
    const clearAll = () => {
      setLoading(false);
      setTimeout(() => {
        setSuccessRes("");
        setOpenModal(false);
      }, 2000);
    };
    try {
      const data = await createScheduleMeeting(scheduleMeetingPayload);
      setLoading(true);
      setSuccessRes(data?.data.body);
      setOpenModal(true);
      setMeetDetails(data?.data.body.data);

      setTimeout(() => {
        if (data?.data.statusCode === 200) {
          setOpenMeetingDetails(true);
        }
      }, 3000);
    } catch (error) {
      console.log(error);
      setLoading(true);
    } finally {
      clearAll();
    }
  };

  const handleCloseMeetingDetails = () => {
    setOpenMeetingDetails(false);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto modal no-scrollbar px-6">
        <div className="flex items-center justify-center min-h-screen pt-4 pb-20 text-center">
          <div className="fixed inset-0 transition-opacity bg-cs-modal-100"></div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
          <div className="inline-block pt-5 pb-4 text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:align-middle sm:w-full sm:max-w-[606px]">
            <div className=" flex justify-between border-b border-solid border-cs-grey-55 px-6 pb-4">
              <h3 className=" text-2xl font-semibold text-cs-grey-dark mb-1">
                Schedule meeting
              </h3>
              <Image
                src={closeIcon}
                alt="close"
                onClick={onClose}
                className=" cursor-pointer"
              />
            </div>

            {/* <div className='px-6'>
              <div className=' flex items-center justify-between mt-6 relative'>
                <div className=' flex items-center gap-x-1'>
                  <Video size="25" color="#7133CF" variant="Bold" />
                  <p className=' text-cs-grey-800 font-medium text-sm lg:text-base'>cecurestream.com/{token}</p>
                </div>
                <div className=' lg:hidden' onClick={async () => handleCopyClick(`https://cecurecast.com/${token}`)}>
                  <Copy size="25" color="#7133CF" />
                </div>
                <p className=' text-cs-purple-400 font-medium cursor-pointer underline hidden lg:block' onClick={async () => handleCopyClick(`https://cecurecast.com/${token}`)}>copy link</p>
              </div>
              {tooltipMessage && <div className=" absolute text-xs text-cs-grey-50 p-2 bg-cs-purple-650 z-10 rounded">{tooltipMessage}</div>}
            </div> */}

            <form className="px-6">
              {/* <AuthInput label='Meeting name' action={handleInput} errorMessage='' inputType='text' inputName='meetingName' placeHolder='My meeting' /> */}

              <div
                className="flex flex-col mt-[22px] w-full"
                id="calendarStyle"
              >
                <label
                  htmlFor="meetingName"
                  className="text-sm font-medium text-cs-grey-100"
                >
                  Meeting name
                </label>
                <div className={` relative ${style.customDateTime}`}>
                  <input
                    type="text"
                    name="meetingName"
                    id="meetingName"
                    className="h-[48px] px-[16px] py-[13px] border-cs-grey-300 border w-full placeholder:text-[#898989] placeholder:text-sm rounded-[10px] outline-none"
                    placeholder="My meeting"
                    onChange={(e) => handleInput(e)}
                  />
                </div>
                <p className="text-sm text-cs-error-500 mt-1"></p>
              </div>

              <div
                className="flex flex-col mt-[22px] w-full"
                id="calendarStyle"
              >
                <label
                  htmlFor="meetingDate"
                  className="text-sm font-medium text-cs-grey-100"
                >
                  Meeting date
                </label>
                <div className={` flex relative ${style.customDateTime}`}>
                  <input
                    type="text"
                    name="meetingDate"
                    id="meetingDate"
                    className="h-[48px] px-[16px] py-[13px] border-cs-grey-300 border rounded-[10px] w-full placeholder:text-[#A4ABB7] placeholder:text-sm outline-none"
                    value={formData.date}
                  />
                  <Calendar
                    size="24"
                    color="#747474"
                    className="absolute top-[11px] right-[10px]  cursor-pointer"
                  />
                  <input
                    type="date"
                    name="meetingDate"
                    id="meetingDate"
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => handleInput(e)}
                    className="absolute top-[11px] right-[10px] cursor-pointer opacity-0"
                    value={formData.date}
                  />
                </div>
                <p className="text-sm text-cs-error-500 mt-1"></p>
              </div>
              {/* onInput={e => formatDate((e.target as HTMLInputElement).value)}  */}
              <div className=" flex gap-x-4">
                <div
                  className="flex flex-col mt-[22px] w-full lg:w-[441px]"
                  id="calendarStyle"
                >
                  <label
                    htmlFor="startTime"
                    className="text-sm font-medium text-cs-grey-100"
                  >
                    Start time
                  </label>
                  <div className={` flex relative ${style.customDateTime}`}>
                    <input
                      type="text"
                      onChange={(e) => e}
                      name="startTime"
                      id="startTime"
                      className="h-[48px] px-[16px] py-[13px] border-cs-grey-300 border rounded-[10px] w-full placeholder:text-[#A4ABB7] placeholder:text-sm outline-none"
                      value={convertTo12HourFormat(formData.startTime)}
                    />
                    <Clock
                      size="24"
                      color="#747474"
                      className="absolute top-[11px] right-[10px]  cursor-pointer"
                    />
                    <input
                      type="time"
                      name="startTime"
                      id="startTime"
                      onChange={(e) => handleInput(e)}
                      className="absolute top-[11px] right-[10px] cursor-pointer opacity-0"
                    />
                  </div>
                  <p className="text-sm text-cs-error-500 mt-1"></p>
                </div>

                <div
                  className="flex flex-col mt-[22px] w-full lg:w-[441px]"
                  id="calendarStyle"
                >
                  <label
                    htmlFor="endTime"
                    className="text-sm font-medium text-cs-grey-100"
                  >
                    End time
                  </label>
                  <div className={` flex relative ${style.customDateTime}`}>
                    <input
                      type="text"
                      onChange={(e) => e}
                      name="endTime"
                      id="endTime"
                      className="h-[48px] px-[16px] py-[13px] border-cs-grey-300 border rounded-[10px] w-full placeholder:text-[#A4ABB7] placeholder:text-sm outline-none"
                      value={convertTo12HourFormat(formData.endTime)}
                    />
                    <Clock
                      size="24"
                      color="#747474"
                      className="absolute top-[11px] right-[10px]  cursor-pointer"
                    />
                    <input
                      type="time"
                      name="endTime"
                      id="endTime"
                      onChange={(e) => handleInput(e)}
                      className="absolute top-[11px] right-[10px] cursor-pointer opacity-0"
                    />
                  </div>
                  <p className="text-sm text-cs-error-500 mt-1"></p>
                </div>
              </div>
            </form>

            <div className=" flex gap-x-1 mt-[22px] px-6 mb-[6px]">
              <UserAdd size="20" color="#333333" />{" "}
              <button className=" text-cs-grey-100 text-xs lg:text-sm">
                Add people
              </button>
            </div>
            <div className="px-6">
              <div className=" flex gap-x-4">
                <input
                  type="email"
                  name="email"
                  id=""
                  className="h-[48px] px-[16px] py-[13px] border-cs-grey-300 border w-full placeholder:text-[#898989] placeholder:text-sm rounded-[10px] outline-none"
                  placeholder="example@mail.com"
                  onChange={(e) => handleInput(e)}
                  value={formData.email}
                  onKeyDown={handleEnterKeyPress}
                />
                <button
                  className=" text-cs-purple-500 bg-white border rounded-[10px] border-cs-purple-500 py-[10px] px-5 min-w-20 text-sm hover:bg-cs-purple-500 hover:text-white"
                  onClick={addEmailToList}
                  disabled={activateEmailButton}
                >
                  Add
                </button>
              </div>
              <p className=" text-cs-grey-100 text-xs lg:text-sm">
                Add their email and press ENTER
              </p>
              {activateEmailButton && (
                <p className=" text-cs-red text-[10px] lg:text-xs">
                  invalid email address
                </p>
              )}
              <div className=" my-5 max-h-[170px] overflow-y-auto customScrollBar pr-1">
                {formData.emailList.map((email) => (
                  <div
                    className=" flex items-center justify-between mb-4"
                    key={email}
                  >
                    <p>{email}</p>
                    <Image
                      src={closeIcon}
                      alt="close"
                      onClick={() => removeEmail(email)}
                      className=" cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-x-1 px-6">
              <button
                className=" bg-cs-grey-60-light text-cs-grey-100 py-4 px-4 rounded-[10px] w-36"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="bg-cs-purple-650  text-cs-grey-50 py-4 px-4 rounded-[10px] w-36 hover:bg-cs-purple-650/80"
                onClick={handleScheduleMeeting}
              >
                Create
              </button>
            </div>
          </div>
        </div>
        <SuccessSlideIn
          openModal={openModal}
          response={successRes?.status === "Success"}
          successActionResponse="Meeting Scheduled"
          closeModal={() => {}}
        />
        <FailureSlideIn
          openModal={openModal}
          response={successRes?.status === "Error"}
          errResponse={successRes?.message}
          closeModal={() => {}}
        />
      </div>
      {loading && <LoadingScreen />}
      {openMeetingDetails && (
        <MeetingDetailsModal
          meetDetails={meetDetails}
          onClose={handleCloseMeetingDetails}
        />
      )}
    </>
  );
};

export default ScheduleMeeting;
