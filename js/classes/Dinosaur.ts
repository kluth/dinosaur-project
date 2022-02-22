import Creature from "./Creature.js";
class Dinosaur extends Creature {
  constructor(
    species: string,
    height: number,
    weight: number,
    diet: string,
    where: string,
    when: string,
    fact: string,
    numOfLegs: number = 4
  ) {
    super(species, height, weight, diet, where, when, fact, numOfLegs);
  }
}

export default Dinosaur;
