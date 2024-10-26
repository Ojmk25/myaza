import React, { useState, useEffect } from "react";
import {
  TranscriptEvent,
  Transcript,
  TranscriptResult,
  TranscriptAlternative,
  TranscriptionStatus,
} from "amazon-chime-sdk-js";
import { useMeetingManager } from "amazon-chime-sdk-component-library-react";

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
  const [transcripts, setTranscripts] = useState<TranscriptEntry[]>([]);
  const [transcriptArray, setTranscriptsArray] = useState<
    TranscriptEntryArray[]
  >([]);
  const maxTranscripts = 10; // Limit the number of transcripts displayed
  const clearTimeoutMs = 5000; // Clear text if no one speaks for 5 seconds

  console.log(transcripts);

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
  //   console.log("Transcription Status:", transcriptEvent);

  //   if (transcriptEvent instanceof TranscriptionStatus) {
  //   } else if (transcriptEvent instanceof Transcript) {
  //     // Process the transcript results
  //     const newEntries = transcriptEvent.results.flatMap(
  //       (result: TranscriptResult) => {
  //         console.log("THIS REPS THE RESULTS ONLY", result);
  //         return result.alternatives.map((alternative) => {
  //           console.log("THIS REPS THE ALTERNATIVES ONLY", alternative);
  //           console.log(
  //             "THIS REPS THE ALTERNATIVES TRANSCRIPT ONLY",
  //             alternative.transcript
  //           );
  //           console.log(
  //             "THIS REPS THE ALTERNATIVES ITEMS CONTENT ONLY",
  //             alternative.items[0]?.content
  //           );
  //           const attendeeId = alternative.items[0]?.attendee.externalUserId;
  //           // const text = alternative.transcript;
  //           const text = alternative.items[0]?.content;

  //           return { attendeeId, text };
  //         });
  //       }
  //     );
  //     console.log(newEntries);

  //     // Update state with new entries
  //     setTranscripts((prevTranscripts) => {
  //       const updatedTranscripts = [...prevTranscripts, ...newEntries];
  //       console.log(updatedTranscripts);

  //       return updatedTranscripts.slice(-10); // Keep only the latest 10 entries
  //     });
  //   }
  // };

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
    if (audioVideo?.transcriptionController) {
      audioVideo.transcriptionController.subscribeToTranscriptEvent(
        transcriptEventHandler
      );
    }
  }, []);

  const transcriptEventHandler = (transcriptEvent: TranscriptEvent): void => {
    console.log("Transcription Status:", transcriptEvent);
    // Check if the event is an instance of TranscriptionStatus
    if (transcriptEvent instanceof TranscriptionStatus) {
      console.log("Transcription Type:", transcriptEvent.type);
      console.log("Transcription Event:", transcriptEvent);
      console.log(
        "Transcription Config:",
        transcriptEvent.transcriptionConfiguration
      );
      // Log transcription status changes (e.g., STARTED, STOPPED, etc.)
    } else if (transcriptEvent instanceof Transcript) {
      console.log("Transcription Event instance:", transcriptEvent);
      const data = extractTranscriptData(transcriptEvent);
      console.log(data);
      flattenUniqueTranscripts(data);
      console.log(transcriptEvent);

      // Log actual transcript results
      transcriptEvent.results.forEach((result: TranscriptResult) => {
        console.log(transcriptEvent);
        console.log(result);
        result.alternatives.forEach((alternative) => {
          console.log("Transcription Text:", alternative.transcript);
          console.log("Transcription Text:", alternative.entities);
          console.log("Transcription alternative:", alternative);

          // Optional: log additional details about each word's timing and speaker
          alternative.items.forEach((item) => {
            console.log("Speaker ID:", item.attendee.externalUserId);
            console.log("Start Time:", item.startTimeMs);
            console.log("End Time:", item.endTimeMs);
          });
        });
      });
    }
  };

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

  // Expected output:
  // [
  //   { attendeeId: "1234", text: "Testing" },
  //   { attendeeId: "5678", text: "Testing again" },
  //   { attendeeId: "5678", text: "Testing" }
  // ]

  // // Subscribing to transcription events
  // const audioVideo = meetingManager.audioVideo;
  // if (audioVideo?.transcriptionController) {
  //   audioVideo.transcriptionController.subscribeToTranscriptEvent(
  //     transcriptEventHandler
  //   );
  // }
  console.log(transcriptArray, "THIS IS THE TRANSCRIPT ARRAY THAT I WOULD USE");

  return (
    // <div
    //   style={{
    //     maxHeight: "300px",
    //     overflowY: "auto",
    //     border: "1px solid #ccc",
    //     padding: "10px",
    //   }}
    // >
    //   <h3>Live Transcript</h3>
    //   {transcripts.length === 0 ? (
    //     <p>No one is speaking...</p>
    //   ) : (
    //     transcripts.map((entry, index) => (
    //       <span key={index} style={{ marginBottom: "10px" }}>
    //         <strong className="text-red-600">{entry.attendeeId}</strong>
    //         <span>{entry.text}</span>
    //       </span>
    //     ))
    //   )}
    // </div>
    <></>
  );
};

export default TranscriptComponent;
