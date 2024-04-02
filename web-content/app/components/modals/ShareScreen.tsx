import Image from 'next/image';
import React, { useState } from 'react';
import closeIconWhite from '@/public/assets/images/closeIconWhite.svg';
import shareOne from '@/public/assets/images/shareOne.png'
import shareTwo from '@/public/assets/images/shareTwo.png'
import shareThree from '@/public/assets/images/shareThree.png'
const ShareScreen = ({ onClose }: { onClose: () => void }) => {

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto modal">
      <div className="flex items-center justify-center min-h-screen pt-4 pb-20 text-center">
        <div className="fixed inset-0 transition-opacity bg-cs-modal-100"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        <div className="inline-block pt-5 pb-4 text-left align-bottom transition-all transform bg-cs-grey-800 rounded-lg shadow-xl sm:align-middle sm:w-full sm:max-w-[606px]">
          <div className=' flex justify-between border-cs-grey-100 px-6 pb-4 border-b-[1px] border-solid'>
            <h3 className=" text-2xl font-semibold text-white mb-1">Select what you want to share</h3>
            <Image src={closeIconWhite} alt='close' onClick={onClose} className=' cursor-pointer' />
          </div>
          <div className="my-4 flex flex-wrap gap-5 px-5">
            <div>
              <Image src={shareOne} alt='close' onClick={onClose} className=' cursor-pointer rounded-lg' />
              <h4 className=' text-sm font-semibold text-white text-center my-3'>Entire screen</h4>
            </div>
            <div>
              <Image src={shareOne} alt='close' onClick={onClose} className=' cursor-pointer rounded-lg' />
              <h4 className=' text-sm font-semibold text-white text-center my-3'>Figma: Untitled 1</h4>
            </div>
            <div>
              <Image src={shareOne} alt='close' onClick={onClose} className=' cursor-pointer rounded-lg' />
              <h4 className=' text-sm font-semibold text-white text-center my-3'>Etheruem app</h4>
            </div>
            <div>
              <Image src={shareOne} alt='close' onClick={onClose} className=' cursor-pointer rounded-lg' />
              <h4 className=' text-sm font-semibold text-white text-center my-3'>Visual Studio Code</h4>
            </div>
            <div>
              <Image src={shareOne} alt='close' onClick={onClose} className=' cursor-pointer rounded-lg' />
              <h4 className=' text-sm font-semibold text-white text-center my-3'>Gallery</h4>
            </div>
          </div>

          <div className=' flex justify-end border-cs-grey-100 px-6 pt-4 border-t-[1px] border-solid gap-x-4'>
            <button className=' text-cs-purple-650 text-sm font-bold border border-cs-purple-650 rounded-[10px] py-3 px-6'>Cancel</button>
            <button className='bg-white text-cs-grey-500 text-sm font-bold rounded-[10px] py-3 px-6 hover:bg-cs-purple-650 hover:text-white'>Share</button>
          </div>
        </div>
      </div>
    </div>
  )
};



export default ShareScreen;
