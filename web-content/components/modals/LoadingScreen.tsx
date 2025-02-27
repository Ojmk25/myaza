import Image from 'next/image';
import React, { useState } from 'react';
import closeIcon from '@/public/assets/images/closeIcon.svg'
import loadingIcon from '@/public/assets/images/loading.svg'
import { AuthInput } from '../auth/AuthInput';
import appleIcon from "@/public/assets/images/appleIcon.svg"
import googleIcon from "@/public/assets/images/googleIcon.svg"
import avatar from '@/public/assets/images/avatar.png'
import { SubmitButton } from '../auth/SubmitButton';


const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto modal no-scrollbar">
      <div className="flex items-center justify-center min-h-screen pt-4 pb-20 text-center">
        <div className="fixed inset-0 transition-opacity bg-[#ffffffa3]"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        <div className="inline-block align-bottom transition-all transform sm:align-middle sm:w-full sm:max-w-[606px]">

          <Image src={loadingIcon} alt='close' className=' cursor-pointer m-auto' />

        </div>
      </div>
    </div>
  )
};



export default LoadingScreen;
