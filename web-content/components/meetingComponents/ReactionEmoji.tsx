import { useAppContext } from "@/context/StoreContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAudioVideo } from "amazon-chime-sdk-component-library-react";
const ReactionEmoji = ({ attendeeId }: { attendeeId: any }) => {
  const [emoji, setEmoji] = useState<{
    sender: string;
    message: any;
    senderExternalId: string;
    lottieCode: string;
  }>();
  const { appState, setAppState } = useAppContext();
  const audioVideo = useAudioVideo();

  useEffect(() => {
    if (!audioVideo) return;

    const handleDataMessage = (dataMessage: {
      data: AllowSharedBufferSource | undefined;
    }) => {
      const message = new TextDecoder().decode(dataMessage.data);
      const parsedMessage = JSON.parse(message);

      setAppState((prevState) => ({
        ...prevState,
        sessionState: {
          ...prevState.sessionState,
          reaction: {
            sender: parsedMessage.sender,
            message: parsedMessage.emoji,
            senderExternalId: parsedMessage.senderExternalId,
            lottieCode: parsedMessage.lottieCode,
          },
        },
      }));
    };

    audioVideo.realtimeSubscribeToReceiveDataMessage(
      "reaction",
      handleDataMessage
    );

    return () => {
      audioVideo.realtimeUnsubscribeFromReceiveDataMessage("reaction");
    };
  }, [audioVideo]);

  useEffect(() => {
    const { reaction } = appState.sessionState;

    if (reaction.sender && reaction.sender === attendeeId) {
      setEmoji(reaction);
    }
    const timeout = setTimeout(() => {
      setEmoji({
        sender: "",
        message: "",
        senderExternalId: "",
        lottieCode: "",
      });
    }, 4000);

    return () => clearTimeout(timeout);
  }, [appState.sessionState.reaction, audioVideo]);

  return (
    <>
      {emoji?.message && emoji?.message !== "" && (
        <Image
          src={emoji?.message}
          alt="hand"
          width={18}
          height={18}
          className="min-w-6 max-w-5 cursor-pointer"
        />
      )}
    </>
  );
};

export default ReactionEmoji;
