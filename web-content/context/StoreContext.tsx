"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  MeetingProvider,
  lightTheme,
  GlobalStyles,
} from "amazon-chime-sdk-component-library-react";
import { ThemeProvider } from "styled-components";
import { VideoFxConfig } from "amazon-chime-sdk-js";
import { GoogleOAuthProvider } from "@react-oauth/google";

export type AtteendeeDetailsProp = {
  full_name: string;
  picture?: string;
  user_id?: string;
};

type AudioState = {
  mute: boolean | null;
  video: boolean;
  attendeeId: string;
  externalUserId: string;
};

type RaisedHand = {
  timestamp: string;
  message: string;
  externalUserID: string;
};

type SessionState = {
  sessionName: string;
  sessionCategory: string;
  sessionId: string;
  reaction: {
    sender: string;
    message: string;
    senderExternalId: string;
    lottieCode: string;
  };
  raisedHand: RaisedHand[];
  guestFirstName: string;
  guestLastName: string;
  meetingAttendees: AtteendeeDetailsProp[];
  audioState: AudioState[];
  recordMeeting: boolean;
  recordMeetingLoading: boolean;
  recordingJustStopped: { externaluserId: string; value: boolean };
  filterClick: string;
  filterConfig: VideoFxConfig;
};

type AppState = {
  sessionState: SessionState;
};

type AppContextType = {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
};

export const AppCtx = createContext<AppContextType>({
  appState: {
    sessionState: {
      sessionName: "",
      sessionCategory: "",
      sessionId: "",
      reaction: {
        sender: "",
        message: "",
        senderExternalId: "",
        lottieCode: "",
      },
      raisedHand: [],
      guestFirstName: "",
      guestLastName: "",
      meetingAttendees: [],
      audioState: [],
      recordMeeting: false,
      recordMeetingLoading: false,
      recordingJustStopped: { externaluserId: "", value: false },
      filterClick: "",
      filterConfig: {
        backgroundBlur: { isEnabled: false, strength: "medium" },
        backgroundReplacement: {
          isEnabled: false,
          backgroundImageURL: "",
          defaultColor: undefined,
        },
      },
    },
  },
  setAppState: () => {},
});

// React.FC<{ children: React.ReactNode }>
export const StoreContext: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [appState, setAppState] = useState<AppState>({
    sessionState: {
      sessionName: "",
      sessionCategory: "",
      sessionId: "",
      reaction: {
        sender: "",
        message: "",
        senderExternalId: "",
        lottieCode: "",
      },
      raisedHand: [],
      guestFirstName: "",
      guestLastName: "",
      meetingAttendees: [],
      audioState: [],
      recordMeeting: false,
      recordMeetingLoading: false,
      recordingJustStopped: { externaluserId: "", value: false },
      filterClick: "",
      filterConfig: {
        backgroundBlur: { isEnabled: false, strength: "medium" },
        backgroundReplacement: {
          isEnabled: false,
          backgroundImageURL: "",
          defaultColor: undefined,
        },
      },
    },
  });

  return (
    <AppCtx.Provider value={{ appState, setAppState }}>
      {children}
    </AppCtx.Provider>
  );
};

export const MeetingProviderComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <GoogleOAuthProvider
      clientId={
        "761443472453-fjqcn1g6k620r341vklrt23ncrc7ctsq.apps.googleusercontent.com"
      }
    >
      <ThemeProvider theme={lightTheme}>
        <GlobalStyles />
        <MeetingProvider>
          <StoreContext>{children}</StoreContext>
        </MeetingProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppCtx);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a StoreContext");
  }
  return context;
};
// export default StoreContext;

// import React, {
//   createContext,
//   useReducer,
//   ReactNode,
//   Dispatch,
//   useMemo,
// } from 'react'
// import referenceStoreReducer, {
//   referenceInitialState,
//   ReferenceAction,
//   referenceInitialStateProps,
// } from './referenceStore'

// export interface StoreContextProps {
//   reference: {
//     data: referenceInitialStateProps
//     dispatchReference: Dispatch<ReferenceAction>
//   }
// }

// export const StoreContext = createContext<StoreContextProps | undefined>(
//   undefined
// )

// interface StoreContextProviderProps {
//   children: ReactNode
// }

// const StoreContextProvider: React.FC<StoreContextProviderProps> = ({
//   children,
// }) => {
//   const [reference, dispatchReference] = useReducer(
//     referenceStoreReducer,
//     referenceInitialState
//   )

//   const storeContextValue: StoreContextProps = useMemo(() => {
//     return {
//       reference: {
//         data: reference,
//         dispatchReference: dispatchReference,
//       },
//     }
//   }, [reference, dispatchReference])

//   return (
//     <StoreContext.Provider value={storeContextValue}>
//       {children}
//     </StoreContext.Provider>
//   )
// }

// export default StoreContextProvider
