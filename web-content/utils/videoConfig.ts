import { 
  LogLevel, 
  ConsoleLogger,
  VideoPreferences
} from 'amazon-chime-sdk-js';

const logger = new ConsoleLogger('VideoConfig', LogLevel.INFO);

export const configureVideoPreferences = (meetingSession: any) => {
  if (!meetingSession) return;

  const audioVideo = meetingSession.audioVideo;
  
  audioVideo.setVideoMaxBandwidthKbps(1500);
  audioVideo.chooseVideoInputQuality(
    1280,    
    720,     
    30,      
    1500   
  );
};

export const setupBandwidthMonitoring = (meetingSession: any) => {
  if (!meetingSession) return;

  const audioVideo = meetingSession.audioVideo;
  
  audioVideo.addObserver({
    videoTileDidUpdate: (tileState: any) => {
      if (tileState.localTile) {
        const preferences = new VideoPreferences();
        audioVideo.chooseVideoInputQuality(1280, 720, 30, 1500);
      }
    },
    
    connectionHealthDidChange: (connectionHealthData: any) => {
      const currentDownstreamPacketLoss = connectionHealthData.currentDownstreamPacketLoss;
      
      if (currentDownstreamPacketLoss > 4) {
        audioVideo.setVideoMaxBandwidthKbps(200);
        audioVideo.chooseVideoInputQuality(640, 360, 15, 200);
      } else {
        audioVideo.setVideoMaxBandwidthKbps(1500);
        audioVideo.chooseVideoInputQuality(1280, 720, 30, 1500);
      }
    }
  });
};