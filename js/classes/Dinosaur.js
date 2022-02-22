import Creature from "./Creature.js";
class Dinosaur extends Creature {
    constructor(species, height, weight, diet, where, when, fact, numOfLegs = 4) {
        super(species, height, weight, diet, where, when, fact, numOfLegs);
    }
}
export default Dinosaur;
