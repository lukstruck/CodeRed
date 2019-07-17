import Entity from "./Entity";
import Modification from "./Modification";

export default class Enemy extends Entity {
    nextPathPoint: number;
    speed: number;
    health: number;
    spawnsChildren: Array;
    actionAtGoal: GoalAction;
}

export const GoalAction = {
    removeLives: RemoveLives,
    removeMoney: RemoveMoney,
    rewardModification: RewardModification
};

class RemoveLives {
    constructor(amount: number){
        this.amount = amount;
    }
}

class RemoveMoney {
    constructor(amount: number) {
        this.amount = amount;
    }
}

class RewardModification {
    constructor(modifications: Array<Modification>) {
        this.modifications = modifications;
    }
}