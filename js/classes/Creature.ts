class Creature {
    species: string;
    height: number;
    weight: number;
    diet: string;
    where: string;
    when: string;
    fact: string;
    numOfLegs: number;
    constructor(species: string, height: number, weight: number, diet: string, where: string, when: string, fact: string, numOfLegs: number) {
        this.species = species;
        this.height = height;
        this.weight = weight;
        this.diet = diet;
        this.where = where;
        this.when = when;
        this.fact = fact;
        this.numOfLegs = numOfLegs
    }
}

export default Creature