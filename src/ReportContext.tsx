
import React, { createContext, useState, ReactNode } from 'react';

interface ReportContextProps {
  report: string;
  setReport: (newReport: string) => void;
}

const defaultContext: ReportContextProps = {
  report: '',
  setReport: () => {},
};

export const ReportContext = createContext<ReportContextProps>(defaultContext);

export const ReportProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [report, setReport] = useState('');

  return (
    <ReportContext.Provider value={{ report, setReport }}>
      {children}
    </ReportContext.Provider>
  );
};
