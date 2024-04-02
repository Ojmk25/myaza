import React, { forwardRef, Ref } from "react";

interface MainHeaderProps { }

export const MainHeader: React.FC<MainHeaderProps> = () => (
  <header style={{ textAlign: "center", paddingTop: "20px", paddingBottom: "10px" }}>
    <h1>Simple Amazon Chime SDK App</h1>
    <p style={{ fontSize: "0.8rem" }}>By WebRTC.Ventures</p>
  </header>
);

interface PeerBoxProps {
  enabled: boolean;
}

export const PeerBox: React.FC<PeerBoxProps> = ({ enabled, ...props }) => (
  <div style={{ display: enabled ? "inline-block" : "none", width: "200px", height: "150px", backgroundColor: "black", margin: "10px" }} {...props}></div>
);

interface VideoProps {
  style?: React.CSSProperties;
}

export const Video = forwardRef<HTMLVideoElement, VideoProps>(({ style = {}, ...props }, ref) => (
  <video ref={ref} width="100%" height="100%" style={{ objectFit: "cover", ...style }} {...props}></video>
));

export const InvisibleAudio = forwardRef<HTMLAudioElement>((props, ref) => (
  <audio ref={ref} style={{ display: "none" }} {...props}></audio>
));

interface SectionBoxProps {
  heading: string;
  children: React.ReactNode
}

export const SectionBox: React.FC<SectionBoxProps> = ({ heading, children, ...props }) => (
  <section style={{ paddingTop: "10px", paddingBottom: "10px" }} {...props}>
    <h2>{heading}</h2>
    {children}
  </section>
);


