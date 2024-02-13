import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

import {Session as SessionSchema} from '../types/Session';
import {WithChildren} from '../utils';

interface Schema {
  session: SessionSchema;
  removeSession: () => Promise<void>;
  fetchLastSession: () => Promise<void>;
  setSession: Dispatch<SetStateAction<SessionSchema>>;
}

export const SessionContext = createContext({} as Schema);

export const UserSessionProvider = ({children}: WithChildren) => {
  const [session, setSession] = useState<SessionSchema>({} as SessionSchema);

  const fetchLastSession = async (): Promise<void> => {
    const currentSession = await new Session().get();
    setSession(currentSession);
  };

  const removeSession = async () => {
    setSession({} as SessionSchema);
  };

  return (
    <SessionContext.Provider
      value={{
        session,
        setSession,
        fetchLastSession,
        removeSession,
      }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);

  if (context) {
    return context;
  }

  throw new Error(
    'Invalid useSession usage! It should be nested into UserSessionProvider.',
  );
};
