import Creature from "./Creature.js";
class Bird extends Creature {
  constructor({
    species = "Some bird",
    height,
    weight,
    diet,
    where,
    when,
    fact,
    numOfLegs = 2
  }) {
    super(species, height, weight, diet, where, when, fact, numOfLegs);
  }
}

export default Bird;
