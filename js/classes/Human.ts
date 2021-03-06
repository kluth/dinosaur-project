import Creature from "./Creature.js";
class Human extends Creature {
  name: string;
  constructor(
    species: string,
    height: number,
    weight: number,
    diet: string,
    where: string,
    when: string,
    fact: string,
    name: string,
    numOfLegs: number = 2
  ) {
    super(species, height, weight, diet, where, when, fact, numOfLegs);
    this.name = name
  }
}

export default Human;
