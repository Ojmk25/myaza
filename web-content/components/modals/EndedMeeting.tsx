import Link from "next/link";

export default function EndedMeetingModal() {
  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto modal no-scrollbar">
        <div className="flex items-center justify-center min-h-screen pt-4 pb-20 text-center">
          <div className="fixed inset-0 transition-opacity bg-[#ffffffa3]"></div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
          <div className="inline-block align-bottom transition-all transform  bg-white rounded-lg shadow-xl sm:align-middle sm:w-full sm:max-w-[406px] border-cs-grey-300 border-solid border h-[200px]">
            <div className=" text-center border-b border-solid border-cs-grey-55 px-6 py-4">
              <h3 className=" text-2xl font-semibold text-cs-grey-dark mb-1">
                Meeting Ended
              </h3>
            </div>

            <div className=" p-4">
              <h3 className=" text-center my-2">
                The host has ended this meeting.
              </h3>

              <Link href={`/`} className="text-cs-purple-650 text-center my-2">
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
