import {Action, Inning, MAX_WICKETS, Player} from '.';

const actions: Action[] = ['dot', 'single', 'double', 'triple', 'four', 'five', 'six', 'wicket'];

const runsMap: Record<Exclude<Action, 'wicket'>, number> = {
  dot: 0,
  single: 1,
  double: 2,
  triple: 3,
  four: 4,
  five: 5,
  six: 6,
};

const handler = (function () {
  const nextBall = (inning: Inning) => {
    inning.overs += 0.1;
    const balls = (inning.overs * 10) % 10;
    if (balls >= 6) {
      inning.overs = inning.overs - balls / 10 + 1;
    }
    if (inning.overs === inning.maxOvers) {
      inning.end = true;
    }
  };

  const nextRun = (runs: number, inning: Inning, batsman1: Player, batsman2: Player) => {
    batsman1.score += runs;
    inning.score += runs;
    const balls = (inning.overs * 10) % 10;
    const strikerChangeViaRun = runs % 2 !== 0;
    const strikerChangeViaOver = balls < 1;
    const strikerChange =
      strikerChangeViaRun && strikerChangeViaOver
        ? false
        : strikerChangeViaOver || strikerChangeViaRun;
    if (strikerChange) {
      batsman1.strikerEnd = false;
      batsman2.strikerEnd = true;
    }

    if (inning.score >= inning.target) {
      inning.end = true;
    }
  };

  const nextOut = (batsman1: Player, inning: Inning) => {
    inning.wickets = inning.wickets + 1;
    if (inning.wickets >= MAX_WICKETS) {
      inning.end = true;
      return;
    }

    let outIndex = inning.currentlyBatting.indexOf(batsman1);
    inning.currentlyBatting.splice(outIndex, 1);
    let nextBatsman = inning.yetToBat.shift();
    if (nextBatsman) {
      nextBatsman.strikerEnd = true;
      inning.currentlyBatting.push(nextBatsman);
    } else {
      inning.end = true;
    }
  };
  return {
    nextBall,
    nextRun,
    nextOut,
  };
})();

export interface InningSimulator {
  next: () => Promise<string>;
}

const simulator = (inning: Inning): InningSimulator => {
  const getNextAction = (player: Player): Action => {
    let pro_actions: Action[] = [];
    for (let action of actions) {
      let i = 0;
      while (i < (player.probability[action] as number) * 100) {
        pro_actions.push(action);
        i++;
      }
    }
    const nextActionIndex = Math.floor(Math.random() * (pro_actions.length - 1));
    return pro_actions[nextActionIndex];
  };

  const next = async (): Promise<string> => {
    const batsman1 = inning.currentlyBatting.find(item => item.strikerEnd);
    const batsman2 = inning.currentlyBatting.find(item => !item.strikerEnd);
    if (batsman1 && batsman2 && !inning.end) {
      const nextAction: Action = getNextAction(batsman1);
      handler.nextBall(inning);
      switch (nextAction) {
        case 'dot':
        case 'single':
        case 'double':
        case 'triple':
        case 'four':
        case 'five':
        case 'six':
          handler.nextRun(runsMap[nextAction], inning, batsman1, batsman2);
          return runsMap[nextAction].toString();
        case 'wicket':
          handler.nextOut(batsman1, inning);
          return 'Out';
      }
    }
    return '';
  };

  return {
    next,
  };
};

export default simulator;
