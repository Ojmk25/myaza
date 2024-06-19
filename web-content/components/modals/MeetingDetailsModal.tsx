import Image from 'next/image';
import Link from 'next/link';
import closeIcon from '@/public/assets/images/closeIcon.svg'

export default function MeetingDetailsModal({ meetDetails, onClose }: { onClose: () => void, meetDetails: any }) {
  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto modal no-scrollbar">
        <div className="flex items-center justify-center min-h-screen pt-4 pb-20 text-center">
          <div className="fixed inset-0 transition-opacity bg-[#ffffffa3]"></div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
          <div className="inline-block align-bottom transition-all transform  bg-white rounded-lg shadow-xl sm:align-middle sm:w-full sm:max-w-[406px] border-cs-grey-300 border-solid border">
            <div className=' flex justify-between border-b border-solid border-cs-grey-55 px-6 py-4'>
              <h3 className=" text-2xl font-semibold text-cs-grey-dark mb-1">Meeting Details</h3>
              <Image src={closeIcon} alt='close' onClick={onClose} className=' cursor-pointer' />
            </div>

            <div className=' p-4'>
              <h3 className=' text-left my-2'>Meeting Name: <span className='text-cs-purple-650'>{meetDetails !== undefined && meetDetails.meeting_name}</span>
              </h3>
              <h3 className=' text-left my-2'>Meeting Link: <Link href={`https://${meetDetails !== undefined && meetDetails.MeetingId}`} className='text-cs-purple-650'>https://{meetDetails !== undefined && meetDetails.MeetingId}
                {/* put id here https://dev.cecurecast.com/98159fe5 */}
              </Link>
              </h3>
              <h3 className=' text-left my-2 '>Add to Calendar: <Link href={meetDetails !== undefined ? meetDetails.add_to_google_cal : ''} className='text-cs-purple-650' target='_blank'>Link to calendar
              </Link>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}