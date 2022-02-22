import Creature from "./Creature.js";
class Human extends Creature {
  constructor(
    species: string = "Human",
    height: number,
    weight: number,
    diet: string,
    where: string,
    when: string,
    fact: string,
    numOfLegs: number = 2,
    name: string
  ) {
    super(species, height, weight, diet, where, when, fact, numOfLegs);
  }
}

export default Human;
