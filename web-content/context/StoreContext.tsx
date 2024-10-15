"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  MeetingProvider,
  lightTheme,
  GlobalStyles,
} from "amazon-chime-sdk-component-library-react";
import { ThemeProvider } from "styled-components";

type AtteendeeDetailsProp = {
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
  raisedHand: { timestamp: string; message: string; externalUserID: string };
  guestFirstName: string;
  guestLastName: string;
  meetingAttendees: AtteendeeDetailsProp[];
  audioState: AudioState[];
  recordMeeeting: boolean;
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
      raisedHand: { timestamp: "", message: "", externalUserID: "" },
      guestFirstName: "",
      guestLastName: "",
      meetingAttendees: [],
      audioState: [],
      recordMeeeting: false,
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
      raisedHand: { timestamp: "", message: "", externalUserID: "" },
      guestFirstName: "",
      guestLastName: "",
      meetingAttendees: [],
      audioState: [],
      recordMeeeting: false,
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
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <MeetingProvider>
        <StoreContext>{children}</StoreContext>
      </MeetingProvider>
    </ThemeProvider>
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
