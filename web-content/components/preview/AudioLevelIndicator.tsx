// 'use client'
// import React, { useEffect, useState } from 'react';

// function AudioLevelIndicator() {
//     const [audioLevel, setAudioLevel] = useState(0);

//     useEffect(() => {
//         async function enableStream() {
//             try {
//                 const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//                 const audioContext = new AudioContext();
//                 const source = audioContext.createMediaStreamSource(stream);
//                 const analyser = audioContext.createAnalyser();
//                 const dataArray = new Uint8Array(analyser.frequencyBinCount);

//                 source.connect(analyser);
//                 analyser.fftSize = 256;

//                 const getAudioLevel = () => {
//                     analyser.getByteFrequencyData(dataArray);
//                     let sum = 0;
//                     for (let i = 0; i < dataArray.length; i++) {
//                         sum += dataArray[i];
//                     }
//                     let average = sum / dataArray.length;
//                     setAudioLevel(average);
//                     requestAnimationFrame(getAudioLevel);
//                 };

//                 getAudioLevel();
//             } catch (error) {
//                 console.error('Error accessing the microphone', error);
//             }
//         }

//         enableStream();

//         return () => {
//             if (audioContext) {
//                 audioContext.close();
//             }
//         };
//     }, []);

//     return (
//         <div>
//             <div style={{ height: '10px', width: `${audioLevel}px`, backgroundColor: 'green' }} />
//             <p>Audio Level: {audioLevel}</p>
//         </div>
//     );
// }

// export default AudioLevelIndicator;


// src/AudioLevelIndicator.tsx

'use client'
import React, { useEffect, useState } from 'react';

const AudioLevelIndicator: React.FC = () => {
  const [audioLevel, setAudioLevel] = useState<number>(0);

  useEffect(() => {
    let audioContext: AudioContext | null = null;

    async function enableStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContext = new AudioContext();
        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        source.connect(analyser);
        analyser.fftSize = 256;

        const getAudioLevel = () => {
          analyser.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
          }
          let average = sum / dataArray.length;
          setAudioLevel(average);
          requestAnimationFrame(getAudioLevel);
        };

        getAudioLevel();
      } catch (error) {
        console.error('Error accessing the microphone', error);
      }
    }

    enableStream();

    return () => {
      audioContext?.close();
    };
  }, []);

  return (
    <div>
      <div style={{ height: '10px', width: `${audioLevel}px`, backgroundColor: 'green' }} />
      <p>Audio Level: {audioLevel}</p>
    </div>
  );
}

export default AudioLevelIndicator;
