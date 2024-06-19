import { useAppContext } from "@/context/StoreContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAudioVideo } from "amazon-chime-sdk-component-library-react";
import raisedHandWhite from '@/public/assets/images/raisedHandWhite.svg'

const RaisedHand = ({ attendeeId }: { attendeeId: any }) => {
  const [raisedHand, setRaisedHand] = useState<{ timestamp: string, message: any }>({ timestamp: '', message: '' })
  const { appState, setAppState } = useAppContext();
  const audioVideo = useAudioVideo()



  useEffect(() => {
    if (!audioVideo) return;

    const handleDataMessage = (dataMessage: { data: AllowSharedBufferSource | undefined; }) => {
      const message = new TextDecoder().decode(dataMessage.data);
      const parsedMessage = JSON.parse(message);

      setAppState((prevState) => ({
        ...prevState,
        sessionState: {
          ...prevState.sessionState,
          raisedHand: { timestamp: parsedMessage.timestamp, message: parsedMessage.message },
        },
      }));
    };

    audioVideo.realtimeSubscribeToReceiveDataMessage('raise-hand', handleDataMessage);

    return () => {
      audioVideo.realtimeUnsubscribeFromReceiveDataMessage('raise-hand');
    };
  }, [audioVideo]);


  useEffect(() => {
    const { raisedHand } = appState.sessionState;

    if (raisedHand.message && raisedHand.message === attendeeId) {
      setRaisedHand(raisedHand);

      const timeout = setTimeout(() => {
        setRaisedHand({ timestamp: '', message: '' });

        setAppState((prevState) => ({
          ...prevState,
          sessionState: {
            ...prevState.sessionState,
            raisedHand: { timestamp: '', message: '' },
          },
        }));
      }, 10000);

      return () => clearTimeout(timeout);
    }
  }, [appState.sessionState.raisedHand]);


  return (<>
    {raisedHand.message !== '' && <div className={`p-2 rounded-md w-fit mx-auto bg-[#5E29B7]`}>
      <Image src={raisedHandWhite} alt="raised-hand" width={16} height={16} className="min-w-4 max-w-4" />
    </div>
    }

  </>)
}

export default RaisedHand;