import Creature from "./Creature.js";
class Human extends Creature {
    constructor(species = "Human", height, weight, diet, where, when, fact, numOfLegs = 2, name) {
        super(species, height, weight, diet, where, when, fact, numOfLegs);
    }
}
export default Human;
