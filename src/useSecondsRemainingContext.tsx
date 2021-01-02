import { UseSecondsRemaining, getSecondsRemaining } from './useSecondsRemining';
import { createCountDownContext } from './createCountDownContext';

interface Props {
  children: React.ReactNode;
}

// Generate context
const [useSecondsRemainingContext, SecondsRemainingContextProvider] = createCountDownContext<UseSecondsRemaining>();

// Generate provider
const SecondsRemainingProvider = ({ children }: Props) => {
  return <SecondsRemainingContextProvider value={[getSecondsRemaining()]}>{children}</SecondsRemainingContextProvider>;
};

export { useSecondsRemainingContext, SecondsRemainingProvider };
