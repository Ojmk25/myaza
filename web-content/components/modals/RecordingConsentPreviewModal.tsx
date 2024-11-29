export default function RecordingConsentPreviewModal({
  onClose,
  joinMeeting,
}: {
  onClose: () => void;
  joinMeeting: () => void;
}) {
  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto modal no-scrollbar">
        <div className="flex items-center justify-center min-h-screen px-2">
          <div
            className="fixed inset-0 transition-opacity bg-[#060606BF]"
            onClick={onClose}
          ></div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
          <div className="inline-block align-bottom transition-all transform  bg-[#FFFFFA] rounded-lg shadow-xl sm:align-middle sm:w-full sm:max-w-[525px] border-cs-grey-300 border-solid border p-6">
            <div className=" pb-4">
              <h3 className=" text-lg md:text-2xl font-semibold text-cs-grey-dark metro-medium">
                Meeting is being recorded
              </h3>
            </div>

            <p className=" text-[#333333] font-medium text-sm metro-medium">
              Do you want to join the meeting while is being recorded?
            </p>
            <div className="flex justify-end gap-x-4 pt-6">
              <button
                className=" bg-cs-grey-60-light text-cs-grey-100 py-3 px-4 rounded-[10px] w-28 font-bold text-sm metro-medium"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="bg-cs-purple-650  text-cs-grey-50 py-3 px-4 rounded-[10px] w-36 hover:bg-cs-purple-650/80 font-bold text-sm metro-medium"
                onClick={joinMeeting}
              >
                Join meeting
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
