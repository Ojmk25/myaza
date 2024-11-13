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

  // Handle transcription events
  // const transcriptEventHandler = (transcriptEvent: TranscriptEvent): void => {
  //   if (transcriptEvent instanceof Transcript) {
  //     const newEntries = transcriptEvent.results.map(
  //       (result: TranscriptResult) => {
  //         const bestAlternative = result
  //           .alternatives[0] as TranscriptAlternative;
  //         return {
  //           // attendeeId: result.attendee.attendeeId,
  //           attendeeId: result.channelId,
  //           text: bestAlternative.transcript,
  //         };
  //       }
  //     );

  //     // Update state with new transcripts and enforce the max transcript limit
  //     setTranscripts((prevTranscripts) => {
  //       const updatedTranscripts = [...prevTranscripts, ...newEntries];
  //       return updatedTranscripts.slice(-maxTranscripts); // Keep only the latest entries
  //     });
  //   }
  // };

  // const transcriptEventHandler = (transcriptEvent: TranscriptEvent): void => {
  //   if (transcriptEvent instanceof TranscriptionStatus) {
  //     console.log("Transcription Event Two:", transcriptEvent);
  //   } else if (transcriptEvent instanceof Transcript) {
  //     // Process the transcript results
  //     const newEntries = transcriptEvent.results.flatMap(
  //       (result: TranscriptResult) => {
  //         return result.alternatives.map((alternative) => {
  //           const attendeeId = alternative.items[0]?.attendee.externalUserId;
  //           const text = alternative.transcript;
  //           // const text = alternative.items[0]?.content;

  //           return { attendeeId, text };
  //         });
  //       }
  //     );

  //     // Update state with new entries
  //     setTranscripts((prevTranscripts) => {
  //       const updatedTranscripts = [...prevTranscripts, ...newEntries];

  //       const uniqueArr = getUniqueTranscripts(updatedTranscripts);
  //       console.log(updatedTranscripts, uniqueArr);
  //       return uniqueArr.slice(-3); // Keep only the latest 3 entries
  //     });
  //   }
  // };

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
  const getUniqueTranscripts = (
    transcripts: { attendeeId: string | undefined; text: string }[]
  ) => {
    const uniqueEntries = new Set<string>(); // Track unique `attendeeId-text` combinations
    const result: { attendeeId: string | undefined; text: string }[] = [];

    transcripts.forEach((entry) => {
      const uniqueKey = `${entry.attendeeId}-${entry.text}`;
      if (!uniqueEntries.has(uniqueKey)) {
        uniqueEntries.add(uniqueKey); // Add to Set to track uniqueness
        result.push(entry); // Add entry to result
      }
    });

    return result;
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

  // const transcriptEventHandler = (transcriptEvent: TranscriptEvent): void => {
  //   console.log("Transcription Status:", transcriptEvent);
  //   // Check if the event is an instance of TranscriptionStatus
  //   if (transcriptEvent instanceof TranscriptionStatus) {
  //     console.log("Transcription Type:", transcriptEvent.type);
  //     console.log("Transcription Event:", transcriptEvent);
  //     console.log(
  //       "Transcription Config:",
  //       transcriptEvent.transcriptionConfiguration
  //     );
  //     // Log transcription status changes (e.g., STARTED, STOPPED, etc.)
  //   } else if (transcriptEvent instanceof Transcript) {
  //     console.log("Transcription Event instance:", transcriptEvent);
  //     const data = extractTranscriptData(transcriptEvent);
  //     console.log(data);
  //     flattenUniqueTranscripts(data);
  //     console.log(transcriptEvent);

  //     // Log actual transcript results
  //     transcriptEvent.results.forEach((result: TranscriptResult) => {
  //       console.log(transcriptEvent);
  //       console.log(result);
  //       result.alternatives.forEach((alternative) => {
  //         console.log("Transcription Text:", alternative.transcript);
  //         console.log("Transcription Text:", alternative.entities);
  //         console.log("Transcription alternative:", alternative);

  //         // Optional: log additional details about each word's timing and speaker
  //         alternative.items.forEach((item) => {
  //           console.log("Speaker ID:", item.attendee.externalUserId);
  //           console.log("Start Time:", item.startTimeMs);
  //           console.log("End Time:", item.endTimeMs);
  //         });
  //       });
  //     });
  //   }
  // };

  // Function to extract transcript and speaker ID
  const extractTranscriptData = (transcriptEvent: TranscriptEvent) => {
    const transcriptData: { transcript: string; attendeeId: string }[] = [];
    if (transcriptEvent instanceof Transcript)
      transcriptEvent.results.forEach((result: TranscriptResult) => {
        result.alternatives.forEach((alternative) => {
          const transcript = alternative.transcript;

          // Extract the attendee ID from the first item
          alternative.items.forEach((item) => {
            const attendeeId = item.attendee.externalUserId;
            // Push an object with transcript and attendeeId to the array
            transcriptData.push({ transcript, attendeeId });
          });
        });
      });

    return transcriptData;
  };

  // const extractTranscriptData = (transcriptEvent: TranscriptEvent) => {
  //   // Use a map to group transcripts by attendeeId
  //   const transcriptMap: { [attendeeId: string]: string } = {};
  //   if (transcriptEvent instanceof Transcript)
  //     transcriptEvent.results.forEach((result: TranscriptResult) => {
  //       result.alternatives.forEach((alternative) => {
  //         const transcript = alternative.transcript;

  //         // Extract attendee ID from the first item
  //         alternative.items.forEach((item) => {
  //           const attendeeId = item.attendee.externalUserId;

  //           // If the attendeeId already exists, append the transcript
  //           if (transcriptMap[attendeeId]) {
  //             transcriptMap[attendeeId] += " " + transcript;
  //           } else {
  //             // Otherwise, initialize it with the current transcript
  //             transcriptMap[attendeeId] = transcript;
  //           }
  //         });
  //       });
  //     });

  //   // Convert the map to an array of objects
  //   return Object.entries(transcriptMap).map(([attendeeId, transcript]) => ({
  //     attendeeId,
  //     transcript,
  //   }));
  // };

  const flattenUniqueTranscripts = (
    transcripts: { attendeeId: string; transcript: string }[]
  ) => {
    const uniqueEntries = new Set<string>(); // Set to track unique combinations
    const result: { attendeeId: string; transcript: string }[] = [];

    transcripts.forEach((entry) => {
      const uniqueKey = `${entry.attendeeId}-${entry.transcript}`;
      if (!uniqueEntries.has(uniqueKey)) {
        uniqueEntries.add(uniqueKey); // Add unique combination to Set
        result.push(entry); // Add the entry to the result array
      }
    });

    setTranscriptsArray(result);
  };

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

// import React, { useState, useEffect } from "react";
// import {
//   TranscriptEvent,
//   Transcript,
//   TranscriptResult,
//   TranscriptionStatus,
// } from "amazon-chime-sdk-js";
// import { useMeetingManager } from "amazon-chime-sdk-component-library-react";
// import { returnFullName } from "@/utils/meetingFunctions";
// import { useAppContext } from "@/context/StoreContext";

// type TranscriptEntry = {
//   attendeeId: string | undefined;
//   text: string;
// };

// const TranscriptComponent = () => {
//   const meetingManager = useMeetingManager();
//   const { appState } = useAppContext();
//   const [transcripts, setTranscripts] = useState<TranscriptEntry[]>([]);
//   const clearTimeoutMs = 5000; // Clear text if no one speaks for 5 seconds

//   const transcriptEventHandler = (transcriptEvent: TranscriptEvent): void => {
//     if (transcriptEvent instanceof TranscriptionStatus) {
//       console.log("Transcription Status:", transcriptEvent);
//     } else if (transcriptEvent instanceof Transcript) {
//       // Process the transcript results and filter to only add final, non-partial transcriptions
//       const finalTranscripts = transcriptEvent.results
//         .filter((result: TranscriptResult) => !result.isPartial) // Only keep final results
//         .map((result: TranscriptResult) => {
//           const attendeeId = result.alternatives[0].items[0]?.attendee.externalUserId;
//           const text = result.alternatives[0].transcript;
//           return { attendeeId, text };
//         });

//       // Update state with only the latest entry for each attendee
//       setTranscripts((prevTranscripts) => {
//         const attendeeTranscripts = new Map<string, TranscriptEntry>();

//         [...prevTranscripts, ...finalTranscripts].forEach((entry) => {
//           if (entry.attendeeId) {
//             attendeeTranscripts.set(entry.attendeeId, entry);
//           }
//         });

//         return Array.from(attendeeTranscripts.values()).slice(-3); // Keep only the latest 3 entries
//       });
//     }
//   };

//   // Clear transcripts after a timeout if no one speaks
//   useEffect(() => {
//     const clearTimer = setTimeout(() => {
//       setTranscripts([]);
//     }, clearTimeoutMs);

//     return () => clearTimeout(clearTimer); // Clear the timer when new text arrives
//   }, [transcripts]); // Reset timer every time the transcripts change

//   // Subscribe to transcription events
//   useEffect(() => {
//     const audioVideo = meetingManager.audioVideo;

//     const subscribeToTranscription = () => {
//       audioVideo?.transcriptionController?.subscribeToTranscriptEvent(transcriptEventHandler);
//       console.log("Subscribed to transcription events.");
//     };

//     const handleTranscriptionStatus = (statusEvent: TranscriptionStatus) => {
//       if (statusEvent.type === "started") {
//         console.log("Transcription started.");
//         subscribeToTranscription();
//       } else if (statusEvent.type === "stopped") {
//         console.log("Transcription stopped.");
//         audioVideo?.transcriptionController?.unsubscribeFromTranscriptEvent(transcriptEventHandler);
//       }
//     };

//     if (audioVideo?.transcriptionController) {
//       // Listen to transcription status changes
//       audioVideo.transcriptionController.subscribeToTranscriptEvent(handleTranscriptionStatus);
//     }

//     // Initial subscription attempt
//     subscribeToTranscription();

//     return () => {
//       // Unsubscribe on component unmount
//       audioVideo?.transcriptionController?.unsubscribeFromTranscriptEvent(transcriptEventHandler);
//       audioVideo?.transcriptionController?.unsubscribeFromTranscriptEvent(handleTranscriptionStatus);
//       console.log("Cleaned up transcription event subscriptions.");
//     };
//   }, [meetingManager]);

//   return (
//     <div className=" bg-cs-grey-50 max-h-80 p-2 overflow-hidden">
//       {transcripts.length === 0 ? (
//         <p>No one is speaking...</p>
//       ) : (
//         transcripts.map((entry, index) => (
//           <div key={index} className="text-cs-grey-dark mb-3 text-base">
//             <strong className="text-cs-grey-dark font-semibold">
//               {returnFullName(
//                 entry.attendeeId,
//                 appState.sessionState.meetingAttendees
//               )}{" "}
//               :{" "}
//             </strong>
//             <span>{entry.text}</span>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default TranscriptComponent;
