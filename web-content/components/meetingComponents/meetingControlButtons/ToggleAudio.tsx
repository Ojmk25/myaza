import { Microphone, MicrophoneSlash1, MoreCircle } from "iconsax-react";
import { useEffect, useState } from "react";
import { DefaultDeviceController, ConsoleLogger } from "amazon-chime-sdk-js";
import ReactDOM from "react-dom";
import { useAppContext } from "@/context/StoreContext";
import { useSessionStorage } from "@/hooks/useStorage";

export const ToggleAudio = ({
  toggleAudi,
  audioLevelDisplayRef,
}: {
  toggleAudi?: () => {};
  audioLevelDisplayRef: any;
}) => {
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [audio, setVideo] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [audioLevel, setAudioLevel] = useState<number>(0);
  const { setAppState } = useAppContext();
  const [audioStatus, setAudioStatus] = useSessionStorage("audioStatus", "no");
  const [loading, setLoading] = useState(false)

  const logger = new ConsoleLogger("MyLogger");
  const deviceController = new DefaultDeviceController(logger, {
    enableWebAudio: true,
  });
  useEffect(() => {
    setAudioStatus("no");
    setLoading(true)
  }, []);

  const handleClick = () => {
    setVideo(!audio);
    toggleAudio();
  };

  // useEffect(() => {
  //   setAppState((prevState) => ({
  //     ...prevState,
  //     sessionState: {
  //       ...prevState.sessionState,
  //       previewAudio: audioEnabled,
  //     },
  //   }));
  // }, [audioEnabled]);

  const toggleAudio = async () => {
    if (audioEnabled && audioStream) {
      await deviceController
        .stopAudioInput()
        .then(() => {
          audioStream.getTracks().forEach((track) => track.stop());
          audioContext?.close();
          setAudioStream(null);
          setAudioContext(null);
          setAudioEnabled(false);
          setAudioStatus("no");
        })
        .catch((error) => {
          console.error("Error stopping audio input:", error);
        });
    } else {
      const audioList = await deviceController.listAudioInputDevices();
      navigator.mediaDevices
        .getUserMedia({ audio: { deviceId: audioList[0].deviceId } })
        .then((stream) => {
          setAudioStream(stream);
          const newAudioContext = new AudioContext();
          setAudioContext(newAudioContext);
        })
        .then(() => {
          setAudioEnabled(true);
          setAudioStatus("yes");
        })
        .catch((error) => {
          console.error("Error starting audio input:", error);
        });
    }
  };

  useEffect(() => {
    if (!audioStream || !audioContext) {
      setAudioLevel(0);
      return;
    }

    const source = audioContext.createMediaStreamSource(audioStream);
    const analyser = audioContext.createAnalyser();
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    source.connect(analyser);

    // analyser.fftSize = 256;
    analyser.fftSize = 2048;

    const getAudioLevel = () => {
      if (!audioEnabled) return;
      analyser.getByteFrequencyData(dataArray);
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
      }
      let average = sum / dataArray.length;
      const normalizedLevel = Math.min(15, (average / 128) * 15);
      setAudioLevel(normalizedLevel);
      requestAnimationFrame(getAudioLevel);
    };

    getAudioLevel();

    return () => {
      source.disconnect();
      analyser.disconnect();
    };
  }, [audioStream, audioContext, audioEnabled]);

  const visualizerStyle = (factor: number) => ({
    height: `${Math.max(3, audioLevel * factor)}px`,
    width: "4px",
  });

  const audioVisualizer = (
    <>
      {audio ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "end",
          }}
          className="p-[6px] bg-[#333333] rounded-full absolute top-[10px] right-[10px] w-[30px] h-[30px]"
        >
          <MicrophoneSlash1 size="18" color="#FAFAFA" />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="p-[6px] bg-[#6c3ec2] rounded-full absolute top-[10px] right-[10px] w-[30px] h-[30px] gap-x-[2px]"
        >
          <div style={visualizerStyle(0.6)} className="bg-white"></div>
          <div style={visualizerStyle(1.4)} className="bg-white"></div>
          <div style={visualizerStyle(2)} className="bg-white"></div>
          <div style={visualizerStyle(1.4)} className="bg-white"></div>
          <div style={visualizerStyle(0.6)} className="bg-white"></div>
        </div>
      )}
    </>
  );

  return (
    <>
      <div className="text-center cursor-pointer" onClick={handleClick}>
        <div
          className={`p-2 md:p-3 ${
            audio ? "bg-[#E1C6FF4D]" : "bg-cs-purple-650"
          } rounded-md max-w-12 relative`}
        >
          {audio ? (
            <MicrophoneSlash1 size="24" color="#5E29B7" className="mx-auto" />
          ) : (
            <Microphone size="24" color="#FAFAFA" className="mx-auto" />
          )}
          {!audio && (
            <MoreCircle
              size="24"
              color="#5E29B7"
              className="mx-auto rounded-full absolute -top-[5px] -right-[10px]"
              style={{ fill: "#ffffff" }}
            />
          )}
        </div>
        <h6 className=" text-cs-grey-100 font-medium text-xs">
          {audio ? "Unmute" : "Mute"}
        </h6>
      </div>
      {audioLevelDisplayRef.current && loading && 
        ReactDOM.createPortal(audioVisualizer, audioLevelDisplayRef.current)}
    </>
  );
};
