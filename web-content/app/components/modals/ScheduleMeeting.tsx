import Image from 'next/image';
import React, { useState } from 'react';
import closeIcon from '@/public/assets/images/closeIcon.svg'
import { Calendar, Clock, UserAdd, Video } from 'iconsax-react';
import { AuthInput } from '../auth/AuthInput';
import DateTimePicker from 'react-datetime-picker';

// import 'react-datetime-picker/dist/DateTimePicker.css';
// import 'react-calendar/dist/Calendar.css';
// import 'react-clock/dist/Clock.css';

import './style.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const ScheduleMeeting = ({ onClose }: { onClose: () => void }) => {
  const [value, onChange] = useState<Value>(new Date());
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto modal">
      <div className="flex items-center justify-center min-h-screen pt-4 pb-20 text-center">
        <div className="fixed inset-0 transition-opacity bg-cs-modal-100"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        <div className="inline-block pt-5 pb-4 text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:align-middle sm:w-full sm:max-w-[606px]">
          <div className=' flex justify-between border-b border-solid border-cs-grey-55 px-6 pb-4'>
            <h3 className=" text-2xl font-semibold text-cs-grey-dark mb-1">Schedule meeting</h3>
            <Image src={closeIcon} alt='close' onClick={onClose} className=' cursor-pointer' />
          </div>
          <div className='px-6'>
            <div className=' flex items-center justify-between mt-6'>
              <div className=' flex items-center gap-x-1'>
                <Video size="25" color="#7133CF" variant="Bold" />
                <p className=' text-cs-grey-800 font-medium'>cecurestream.com/43u43ihjsd</p>
              </div>
              <p className=' text-cs-purple-400 font-medium cursor-pointer underline'>copy link</p>
            </div>
          </div>
          <form className='px-6'>
            <AuthInput label='Meeting name' action={() => { }} errorMessage='' inputType='text' inputName='meetingName' placeHolder='My meeting' />
            <div className="flex flex-col mt-[22px] w-full" id='calendarStyle'>
              <label htmlFor="meetingDate" className=" text-sm font-medium text-cs-grey-100">Meeting date</label>
              <DateTimePicker onChange={onChange} value={value} isClockOpen={false} isCalendarOpen={false} calendarAriaLabel={"Toggle calendar"} calendarIcon={<Calendar size="24" color="#747474" />} clearIcon={null} disableClock={true} format="dd/MM/y" className="w-full h-[48px] placeholder:text-[#898989] placeholder:text-sm rounded-[10px] mt-[6px] outline-none" minDate={new Date()} name='calendar' id='meetingDate' />
              <p className="text-sm text-cs-error-500 mt-1"></p>
            </div>

            <div className=' flex gap-x-4'>
              <div className="flex flex-col mt-[22px] w-full" id='calendarStyle'>
                <label htmlFor="startTime" className=" text-sm font-medium text-cs-grey-100">Start time</label>
                <DateTimePicker onChange={onChange} value={value} calendarIcon={<Clock size="24" color="#747474" />} clearIcon={null} format="hh:mm a" className="w-full h-[48px] placeholder:text-[#898989] placeholder:text-sm rounded-[10px] mt-[6px] outline-none" shouldOpenWidgets={({ reason, widget }) => reason !== 'buttonClick' && widget === 'clock'} minDate={new Date()} id='startTime' />
                <p className="text-sm text-cs-error-500 mt-1"></p>
              </div>
              <div className="flex flex-col mt-[22px] w-full" id='calendarStyle'>
                <label htmlFor="endTime" className=" text-sm font-medium text-cs-grey-100">End time</label>
                <DateTimePicker onChange={onChange} value={value} calendarIcon={<Clock size="24" color="#747474" />} clearIcon={null} format="hh:mm a" className="w-full h-[48px] placeholder:text-[#898989] placeholder:text-sm rounded-[10px] mt-[6px] outline-none" shouldOpenWidgets={({ reason, widget }) => reason !== 'buttonClick' && widget === 'clock'} minDate={new Date()} id='endTime' />
                <p className="text-sm text-cs-error-500 mt-1"></p>
              </div>
            </div>
          </form>

          <div className=' flex gap-x-1 mt-[22px] px-6 mb-[6px]'>
            <UserAdd size="20" color="#333333" /> <button className=' text-cs-grey-100 text-sm'>Add people</button>
          </div>
          <div className='px-6'>
            <div className=' flex gap-x-4'>
              <input type="email" name="" id="" className='h-[48px] px-[16px] py-[13px] border-[#9F9F9F] border w-full placeholder:text-[#898989] placeholder:text-sm rounded-[10px] outline-none' placeholder='example@mail.com' />
              <button className=' text-cs-purple-500 bg-white border rounded-[10px] border-cs-purple-500 py-[10px] px-5 min-w-20'>Add</button>
            </div>
            <p className=' text-cs-grey-100 text-sm'>Add their email and press ENTER</p>
            <div className=' my-5'>
              <div className=' flex items-center justify-between mb-4'>
                <p>Henrytheninth@gmail.com</p>
                <Image src={closeIcon} alt='close' onClick={() => { }} className=' cursor-pointer' />
              </div>
              <div className=' flex items-center justify-between mb-4'>
                <p>Emmanuel@gmail.com</p>
                <Image src={closeIcon} alt='close' onClick={() => { }} className=' cursor-pointer' />
              </div>
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
