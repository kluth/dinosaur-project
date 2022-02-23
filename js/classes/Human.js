import Creature from "./Creature.js";
class Human extends Creature {
    constructor(species, height, weight, diet, where, when, fact, name, numOfLegs = 2) {
        super(species, height, weight, diet, where, when, fact, numOfLegs);
        this.name = name;
    }
}
export default Human;
