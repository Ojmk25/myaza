import Image from 'next/image';
import React, { useState } from 'react';
import closeIcon from '@/public/assets/images/closeIcon.svg'
import { AuthInput } from '../auth/AuthInput';
import appleIcon from "@/public/assets/images/appleIcon.svg"
import googleIcon from "@/public/assets/images/googleIcon.svg"
import { SubmitButton } from '../auth/SubmitButton';


const ScheduleMeeting = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto modal">
      <div className="flex items-center justify-center min-h-screen pt-4 pb-20 text-center">
        <div className="fixed inset-0 transition-opacity bg-cs-modal-100"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        <div className="inline-block pt-5 pb-4 text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:align-middle sm:w-full sm:max-w-[606px]">
          <div className=' flex justify-between border-b border-cs-grey-55 px-6 pb-4'>
            <h3 className=" text-2xl font-semibold text-cs-grey-dark mb-1">Join meeting</h3>
            <Image src={closeIcon} alt='close' onClick={onClose} className=' cursor-pointer' />
          </div>
          <form className='px-6'>
            <AuthInput label='First name' action={() => { }} errorMessage='' inputType='text' inputName='firstName' placeHolder='First name' />
            <AuthInput label='Last name' action={() => { }} errorMessage='' inputType='text' inputName='lasttName' placeHolder='Last name' />
            <SubmitButton text="Join meeting" action={() => { }} activate={true} />
          </form>
          <div className="grid my-6 grid-cols-7 items-center px-6">
            <div className=" h-[1px] bg-cs-grey-55 col-start-1 col-end-4"></div>
            <span className=" text-center text-cs-grey-400 text-sm">or</span>
            <div className=" h-[1px] bg-cs-grey-55 col-start-5 col-end-8"></div>
          </div>
          <div className="my-8 px-6">
            <div className="border border-cs-grey-150 rounded-lg flex items-center justify-center w-full py-[10px] px-6"><Image src={googleIcon} alt="google" /> <span className='text-cs-grey-dark font-medium ml-2'>Join with Google</span></div>
            <div className="border border-cs-grey-150 rounded-lg flex items-center justify-center w-full py-[10px] px-6 my-8"><Image src={appleIcon} alt="apple" /> <span className='text-cs-grey-dark font-medium ml-2'>Join with Apple</span></div>
          </div>
        </div>
      </div>
    </div>
  )
};



export default ScheduleMeeting;
