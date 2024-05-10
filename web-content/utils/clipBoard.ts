/**
 * Copies the provided text to the clipboard.
 * @param text The text to be copied to the clipboard.
 */


export const copyTextToClipboard = async (text: string, onSuccess: () => void, onError: () => void): Promise<void> => {
  if (!navigator.clipboard) {
    console.error("Clipboard operations are not available.");
    onError();
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    console.log('Text copied to clipboard successfully!', text);
    onSuccess();
  } catch (err) {
    console.error('Failed to copy text: ', err);
    onError();
  }
};


export default copyTextToClipboard;




// <div className="basis-full">
// {/* <Image src={avatar} alt="hero" height={490} width={600} className="w-[600px] h-[490px]" /> */}
// <div className=" relative">
//   <div className=" w-[508px] h-[289px] relative bg-cs-black-200 rounded-[31px]">
//     <video id="video-preview" autoPlay className=" rounded-[31px] min-w-[508px] min-h-[289px] h-full w-full object-cover" ref={videRef}></video>
//     <div className="p-[6px] bg-[#333333] rounded-full absolute top-[10px] right-[10px]"><MicrophoneSlash1 size="18" color="#FAFAFA" /></div>
//   </div>

//   <div className=" flex justify-center my-6">
//     <div className=" flex gap-x-6">
//       <div className="text-center cursor-pointer">
//         {/* <div className={`p-3 ${changeBg ? "bg-cs-purple-650" : "bg-[#E1C6FF4D]"} rounded-md max-w-12 relative`}> */}
//         <div className={`p-3 bg-cs-purple-650 bg-[#E1C6FF4D] rounded-md max-w-12 relative`}>

//           {/* <MicrophoneSlash1 size="24" color={`${changeBg ? "#FAFAFA" : "#5E29B7"}`} className="mx-auto" /> */}
//           <MicrophoneSlash1 size="24" color={`#FAFAFA`} className="mx-auto" />
//           {/* <span className="absolute -top-[5px] -right-[10px]  w-fit rounded-full"><MoreCircle size="24" color={`${changeBg ? "#5E29B7" : "#5E29B7"}`} className="mx-auto rounded-full border bg-white " variant="Outline" /></span> */}
//           <span className="absolute -top-[5px] -right-[10px]  w-fit rounded-full"><MoreCircle size="24" color={`#5E29B7`} className="mx-auto rounded-full border bg-white " variant="Outline" /></span>
//         </div>
//         <h6 className=" text-cs-grey-100 font-medium text-xs">Unmute</h6>
//       </div>

//       <div className="text-center cursor-pointer">
//         <div className="p-3 bg-[#E1C6FF4D] rounded-md max-w-12 mx-auto" onClick={toggleVideo}>
//           <VideoSlash size="24" color="#5E29B7" className="mx-auto" />
//         </div>
//         <h6 className=" text-cs-grey-100 font-medium text-xs">Video</h6>
//       </div>

//       <div className=" bg-cs-red text-center rounded-lg py-4 px-6 text-white font-bold text-sm h-fit cursor-pointer">
//         <span>End</span>
//       </div>
//     </div>
//   </div>
// </div>
// </div>