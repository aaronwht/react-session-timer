import { getMember } from './utils';

export type UseSecondsRemaining = [number];

export type GetSecondsRemaining = number;

export const getSecondsRemaining = (): GetSecondsRemaining => {
  const member = getMember();
  if (member !== null && typeof member !== 'undefined' && member.sessionSecondsRemaining !== null) return member.sessionSecondsRemaining;

  return 0;
};

export const useSecondsRemaining = (allSecondsRemaining: number): UseSecondsRemaining => {
  return [allSecondsRemaining];
};
