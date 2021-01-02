import React from 'react';

export const createCountDownContext = <T extends unknown>() => {
  // Create a context with a generic parameter or undefined
  const countDownContext = React.createContext<T | undefined>(undefined);

  // Check if the value provided to the context is defined or throw an error
  const useCountDownContext = () => {
    const contextIsDefined = React.useContext(countDownContext);
    if (!contextIsDefined) {
      throw new Error('createCountDownContext must be used within a Provider');
    }
    return contextIsDefined;
  };

  return [useCountDownContext, countDownContext.Provider] as const;
};
