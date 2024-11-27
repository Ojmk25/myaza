import React, { useState, useEffect } from "react";
import {
  TranscriptEvent,
  Transcript,
  TranscriptResult,
  TranscriptionStatus,
} from "amazon-chime-sdk-js";
import { useMeetingManager } from "amazon-chime-sdk-component-library-react";
import { returnFullName } from "@/utils/meetingFunctions";
import { useAppContext } from "@/context/StoreContext";

type TranscriptEntry = {
  attendeeId: string | undefined;
  text: string;
};

type TranscriptEntryArray = {
  attendeeId: string;
  transcript: string;
};

const TranscriptComponent = () => {
  const meetingManager = useMeetingManager();
  const { appState } = useAppContext();
  const [transcripts, setTranscripts] = useState<TranscriptEntry[]>([]);
  const [transcriptArray, setTranscriptsArray] = useState<
    TranscriptEntryArray[]
  >([]);
  const [putResults, setPutResults] = useState<any>([]);
  const maxTranscripts = 10; // Limit the number of transcripts displayed
  const clearTimeoutMs = 5000; // Clear text if no one speaks for 5 seconds

  const transcriptEventHandler = (transcriptEvent: TranscriptEvent): void => {
    if (transcriptEvent instanceof TranscriptionStatus) {
      console.log("Transcription Event Two:", transcriptEvent);
    } else if (transcriptEvent instanceof Transcript) {
      console.log(
        transcriptEvent.results[0].alternatives[0].transcript,
        "JUST TO SEE HOW FAST THE TRANSCRIPT IS"
      );
      // Process the transcript results and filter to only add final, non-partial transcriptions
      const finalTranscripts = transcriptEvent.results
        .filter((result: TranscriptResult) => !result.isPartial) // Only keep final results
        .map((result: TranscriptResult) => {
          console.log(result);

          const attendeeId =
            result.alternatives[0].items[0]?.attendee.externalUserId;
          const text = result.alternatives[0].transcript;

          return { attendeeId, text };
        });

      // Update state with only the latest entry for each attendee
      setTranscripts((prevTranscripts) => {
        // Create a map to store the latest transcript for each attendee
        const attendeeTranscripts = new Map<string, TranscriptEntry>();

        // Populate the map, ensuring only the latest entry for each attendee is kept
        [...prevTranscripts, ...finalTranscripts].forEach((entry) => {
          if (entry.attendeeId) {
            attendeeTranscripts.set(entry.attendeeId, entry);
          }
        });

        // Convert the map back to an array and keep the latest entries
        return Array.from(attendeeTranscripts.values()).slice(-3); // Keep only the latest 3 entries
      });
    }
  };

  // Clear transcripts after a timeout if no one speaks
  useEffect(() => {
    const clearTimer = setTimeout(() => {
      setTranscripts([]);
    }, clearTimeoutMs);

    return () => clearTimeout(clearTimer); // Clear the timer when new text arrives
  }, [transcripts]); // Reset timer every time the transcripts change

  // Subscribe to transcription events
  useEffect(() => {
    const audioVideo = meetingManager.audioVideo;
    console.log(audioVideo?.transcriptionController);

    if (audioVideo?.transcriptionController) {
      audioVideo.transcriptionController.subscribeToTranscriptEvent(
        transcriptEventHandler
      );
    }
    return () => {
      audioVideo?.transcriptionController?.unsubscribeFromTranscriptEvent(
        transcriptEventHandler
      );
    };
  }, [meetingManager?.audioVideo]);

  return (
    <div className=" bg-cs-grey-50 max-h-80 p-2 overflow-hidden absolute bottom-[130px] left-5 md:left-10 max-w-80 md:max-w-[600px]">
      {transcripts.length === 0 ? (
        <p className="text-cs-grey-dark font-semibold">...</p>
      ) : (
        transcripts.map((entry, index) => (
          <div key={index} className="text-cs-grey-dark text-sm">
            <strong className="text-cs-grey-dark font-semibold">
              {returnFullName(
                entry.attendeeId,
                appState.sessionState.meetingAttendees
              )}{" "}
              :{" "}
            </strong>
            <span>{entry.text}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default TranscriptComponent;
