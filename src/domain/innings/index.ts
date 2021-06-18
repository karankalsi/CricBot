import bangaloreChennaiT20 from './bangaloreChennaiT20';
import simulator from './simulator';

export type Action = 'dot' | 'single' | 'double' | 'triple' | 'four' | 'five' | 'six' | 'wicket';

export interface ActionProbability extends Record<Action, number> {
  dot: number;
  single: number;
  double: number;
  triple: number;
  four: number;
  five: number;
  six: number;
  wicket: number;
}

export interface Player {
  id: number;
  name: string;
  score: number;
  balls: number;
  strikerEnd: boolean;
  probability: ActionProbability;
}

export interface Inning {
  team1: string;
  team2: string;
  score: number;
  target: number;
  overs: number;
  wickets: number;
  maxOvers: number;
  end: boolean;
  yetToBat: Player[];
  currentlyBatting: Player[];
}

export const MAX_WICKETS = 10;

export default {bangaloreChennaiT20, simulator};
