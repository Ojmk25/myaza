import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import closeIcon from '@/public/assets/images/closeIcon.svg'
import { Calendar, Clock, UserAdd, Video, Copy } from 'iconsax-react';
import { AuthInput } from '../auth/AuthInput';
import DateTimePicker from 'react-datetime-picker';

import style from './style.module.css'

import { ValidateEmail, ValidatePassword } from '@/utils/Validators';
import copyTextToClipboard from '@/utils/clipBoard';
import { generateCustomId } from '@/utils/customIDGenerator';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface FormData {
  meetingName: string;
  email: string;
  emailList: string[];
  startTime: string | '12:00';
  endTime: string | '12:00';
  date: Value | string;
}


const ScheduleMeeting = ({ onClose }: { onClose: () => void }) => {
  const [value, onChange] = useState<Value>(new Date());
  const [token, setToken] = useState('');
  const [tooltipMessage, setTooltipMessage] = useState('');



  useEffect(() => {
    setToken(generateCustomId())
  }, [])

  const [fomrData, setFormData] = useState<FormData>({
    meetingName: '',
    email: '',
    startTime: '' || '12:00',
    endTime: '' || '14:00',
    date: formatDate(value),
    emailList: [],
  });

  const [errMessage, setErrMessage] = useState({
    newPassword: '',
    confirmPassword: '',
    code: '',
  })


  const handleInput = (input: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = input.target;
    console.log("name is :", name, value);
    const addColour = (elem: React.ChangeEvent<HTMLInputElement>) => {
      elem.target.classList.add('border-fm-error-red');
      elem.target.classList.add('placeholder:text-fm-error-red')
      elem.target.classList.remove('bg-fm-slate-200')
      setErrMessage(prevState => ({
        ...prevState,
        [name]: `Invalid ${name}`
      }));
    }
    const removeColour = (elem: React.ChangeEvent<HTMLInputElement>) => {
      elem.target.classList.remove('border-fm-error-red');
      elem.target.classList.remove('placeholder:text-fm-error-red')
      elem.target.classList.add('bg-fm-slate-200')
      setErrMessage(prevState => ({
        ...prevState,
        [name]: ''
      }));
    }
    if (name === "email") {
      if ((!ValidateEmail(value))) {
        addColour(input)
      } else {
        removeColour(input)
      }
    }

    if (input.target.value.length === 0) {
      setErrMessage(prevState => ({
        ...prevState,
        [name]: `Enter your ${name}`
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  }

  const addEmailToList = () => {
    const { email, emailList } = fomrData;
    if (email && !emailList.includes(email)) {
      setFormData(prev => ({
        ...prev,
        emailList: [...prev.emailList, prev.email],
        email: ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        email: ''
      }));
    }
  };

  const removeEmail = (emailToRemove: string) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      emailList: prevFormData.emailList.filter(email => email !== emailToRemove)
    }));
  };
  // "{
  //   ""meeting_name: ""abc"",
  //   ""meeting_date: ""dd-mm-yyyy"",
  //   ""start_time: ""hh:mm"",
  //   ""end_time: ""hh:mm"",
  //   ""meeting_link: ""abc"",
  //    ""attendees"": [""abc@kml.com"", ""def@hij.com],
  //   ""is_instant"": false
  // }"
  const [minTime, setMinTime] = useState<string>('');

  function convertTo12HourFormat(time: string): string {
    const [hourStr, minuteStr] = time.split(':');
    const hours = parseInt(hourStr, 10);
    const minutes = parseInt(minuteStr, 10);

    const period = hours >= 12 ? 'PM' : 'AM';

    const hours12 = hours % 12 || 12;

    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${hours12}:${formattedMinutes} ${period}`;
  }

  const handleEnterKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addEmailToList()
      event.preventDefault();
    }
  };

  function formatDate(dateString: any): string {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  const handleCopyClick = (value: string) => {
    copyTextToClipboard(value,
      () => {
        setTooltipMessage('copied');
        setTimeout(() => setTooltipMessage(''), 2000);
      },
      () => {
        setTooltipMessage('Failed to copy!');
        setTimeout(() => setTooltipMessage(''), 2000);
      }
    );
  };



  return (
    <div className="fixed inset-0 z-10 overflow-y-auto modal no-scrollbar px-6">
      <div className="flex items-center justify-center min-h-screen pt-4 pb-20 text-center">
        <div className="fixed inset-0 transition-opacity bg-cs-modal-100"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        <div className="inline-block pt-5 pb-4 text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:align-middle sm:w-full sm:max-w-[606px]">
          <div className=' flex justify-between border-b border-solid border-cs-grey-55 px-6 pb-4'>
            <h3 className=" text-2xl font-semibold text-cs-grey-dark mb-1">Schedule meeting</h3>
            <Image src={closeIcon} alt='close' onClick={onClose} className=' cursor-pointer' />
          </div>

          <div className='px-6'>
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
          </div>

          <form className='px-6'>
            <AuthInput label='Meeting name' action={handleInput} errorMessage='' inputType='text' inputName='meetingName' placeHolder='My meeting' />

            <div className="flex flex-col mt-[22px] w-full" id={style.calendarStyle}>
              <label htmlFor="meetingDate" className=" text-sm font-medium text-cs-grey-100">Meeting date</label>
              <DateTimePicker onChange={onChange} value={value} isClockOpen={false} isCalendarOpen={false} calendarAriaLabel={"Toggle calendar"} calendarIcon={<Calendar size="24" color="#747474" />} clearIcon={null} disableClock={true} format="dd/MM/y" className="w-full h-[48px] placeholder:text-[#898989] placeholder:text-sm rounded-[10px] mt-[6px] outline-none" minDate={new Date()} name='calendar' id='meetingDate' />
              <p className="text-sm text-cs-error-500 mt-1"></p>
            </div>

            <div className=' flex gap-x-4'>
              <div className="flex flex-col mt-[22px] w-full lg:w-[441px]" id='calendarStyle'>
                <label htmlFor='startTime' className="text-sm font-normal text-fm-slate-800">Start time</label>
                <div className=" flex relative customCalendar">
                  <input type="text" onChange={(e) => (e)} name='startTime' id='startTime' className="h-[44px] px-[16px] py-[13px] border-[#A4ABB7] border rounded-[6px] w-full mt-[6px] placeholder:text-[#A4ABB7] placeholder:text-sm" value={convertTo12HourFormat(fomrData.startTime)} />
                  <Clock size="24" color="#747474" className="absolute top-[15px] right-[10px]  cursor-pointer" />
                  <input type="time" name="startTime" id="startTime" onChange={(e) => handleInput(e)} className="absolute top-[15px] right-[10px] cursor-pointer opacity-0" />
                </div>
                <p className="text-sm text-cs-error-500 mt-1"></p>
              </div>
              <div className="flex flex-col mt-[22px] w-full lg:w-[441px]" id='calendarStyle'>
                <label htmlFor='endTime' className="text-sm font-normal text-fm-slate-800">End time</label>
                <div className=" flex relative customCalendar">
                  <input type="text" onChange={(e) => (e)} name='endTime' id='endTime' className="h-[44px] px-[16px] py-[13px] border-[#A4ABB7] border rounded-[6px] w-full mt-[6px] placeholder:text-[#A4ABB7] placeholder:text-sm" value={convertTo12HourFormat(fomrData.endTime)} />
                  <Clock size="24" color="#747474" className="absolute top-[15px] right-[10px]  cursor-pointer" />
                  <input type="time" name="endTime" id="endTime" onChange={(e) => handleInput(e)} className="absolute top-[15px] right-[10px] cursor-pointer opacity-0" />
                </div>
                <p className="text-sm text-cs-error-500 mt-1"></p>
              </div>
            </div>
          </form>

          <div className=' flex gap-x-1 mt-[22px] px-6 mb-[6px]'>
            <UserAdd size="20" color="#333333" /> <button className=' text-cs-grey-100 text-xs lg:text-sm'>Add people</button>
          </div>
          <div className='px-6'>
            <div className=' flex gap-x-4'>
              <input type="email" name="email" id="" className='h-[48px] px-[16px] py-[13px] border-[#9F9F9F] border w-full placeholder:text-[#898989] placeholder:text-sm rounded-[10px] outline-none' placeholder='example@mail.com' onChange={(e) => handleInput(e)} value={fomrData.email} onKeyDown={handleEnterKeyPress} />
              <button className=' text-cs-purple-500 bg-white border rounded-[10px] border-cs-purple-500 py-[10px] px-5 min-w-20 text-sm' onClick={addEmailToList}>Add</button>
            </div>
            <p className=' text-cs-grey-100 text-xs lg:text-sm'>Add their email and press ENTER</p>
            <div className=' my-5'>
              {fomrData.emailList.map(email =>
                <div className=' flex items-center justify-between mb-4' key={email}>
                  <p>{email}</p>
                  <Image src={closeIcon} alt='close' onClick={() => removeEmail(email)} className=' cursor-pointer' />
                </div>
              )}
            </div>
          </div>

          <div className='flex justify-end gap-x-1 px-6'>
            <button className=' bg-cs-grey-60-light text-cs-grey-100 py-4 px-4 rounded-[10px] w-36' onClick={onClose}>Cancel</button>
            <button className='bg-cs-purple-650  text-cs-grey-50 py-4 px-4 rounded-[10px] w-36'>Create</button>
          </div>
        </div>
      </div>
    </div>
  )
};



export default ScheduleMeeting;
