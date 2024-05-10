"use client"
import React, { createContext, useContext, useState } from "react";
import {
  MeetingProvider,
  lightTheme,
  GlobalStyles,

}
  from 'amazon-chime-sdk-component-library-react';
import { ThemeProvider } from "styled-components";

type SessionState = {
  sessionName: string;
  sessionCategory: string;
  expectedGuest: string;
  eventDate: string;
  eventTime: string;
  eventType: string;
  camList: string[];
  incallMessages: { sender: string; attendeeId: string; message: string }[];
};

type AppState = {
  sessionState: SessionState;
  verificationState: VerificationState;
};

type VerificationState = {
  afterFirstVerification: boolean;
  verificationTime: number;
}

type AppContextType = {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
};

export const AppCtx = createContext<AppContextType>({
  appState: {
    sessionState: {
      sessionName: "",
      sessionCategory: "",
      expectedGuest: "",
      eventDate: "",
      eventTime: "",
      eventType: "Recurring",
      camList: [],
      incallMessages: [],
    },
    verificationState: {
      afterFirstVerification: false,
      verificationTime: 30,
    },
  },
  setAppState: () => { },
});

// React.FC<{ children: React.ReactNode }> 
export const StoreContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appState, setAppState] = useState<AppState>({
    sessionState: {
      sessionName: "",
      sessionCategory: "",
      expectedGuest: "",
      eventDate: "",
      eventTime: "",
      eventType: "Recurring",
      camList: [],
      incallMessages: [],
    },
    verificationState: {
      afterFirstVerification: false,
      verificationTime: 30,
    },
  });

  return (
    <AppCtx.Provider value={{ appState, setAppState }
    }>
      {children}
    </AppCtx.Provider>
  );
};


export const MeetingProviderComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <MeetingProvider>
        <StoreContext>
          {children}
        </StoreContext>
      </MeetingProvider>
    </ThemeProvider>
  )
}

// export default StoreContext;
