import Human from "./classes/Human.js";
import Dinosaur from "./classes/Dinosaur.js";
import Bird from "./classes/Bird.js";
import creatures from "../creatures.js";

const fetchCreatures = (human) => {
  let creatureList = [];
  // Create dinosaur objects of the creatures
  creatures.Dinos.map((creature) => {
    if (creature.species !== "Pigeon") {
      creatureList.push(new Dinosaur(creature));
    } else {
      creatureList.push(new Bird(creature));
    }
  });

  // Add human to the middle of the array
  creatureList.splice(Math.round(creatureList.length / 2), 0, human);
  return creatureList;
};

const createBaseGrid = (list = []) => {
  let container = document.createElement("div");
  container.classList.add("grid", "hidden");
  let types = ["numOfLegs", "height", "weight"];
  types.map((type) => {
    let button = document.createElement("button");
    button.innerText = `Sort by ${type}`;
    button.addEventListener("click", () => {
      let sortedList = sortList(list, type);
      createBaseGrid(sortedList);
      fillGrid(sortedList);
    });
    container.append(button);
  });

  for (let ix = 0; ix < list.length; ix++) {
    let field = document.createElement("div");
    field.id = `field-${ix}`;
    field.classList.add("card");
    container.append(field);
  }
  return container;
};

// Sorting by type of sort
const sortList = (list, type = "weight") => {
  switch (type) {
    case "weight":
      list.sort(function (a, b) {
        return a.weight - b.weight;
      });
      return list;
    case "height":
      list.sort(function (a, b) {
        return a.height - b.height;
      });
      return list;
    case "numOfLegs":
      list.sort(function (a, b) {
        return a.numOfLegs - b.numOfLegs;
      });
      return list;
    default:
      return list;
  }
};

// Fill the grid with the sorted list
const fillGrid = (creatureList = []) => {
  // Fill the grid
  creatureList.map((creature, index) => {
    let name = creature.name ? creature.name : creature.species;
    let dataList = document.createElement("ul");
    Object.entries(creature).map((entry) => {
      document.querySelector(`#field-${index}`).innerHTML = "";
      let item = document.createElement("li");
      // Fill the values in the list elements
      if (entry[0] !== "fact") {
        if (entry[0] === "species") {
          item.innerHTML = `<strong>Name:</strong> ${name}`;
        } else {
          item.innerHTML = `<strong>${entry[0]}:</strong> ${entry[1]}`;
        }
      } else {
        let rnNum = Math.floor(Math.random() * 10);
        let randomFact = entry[1][rnNum > 5 ? 1 : 0];
        item.innerHTML = `<strong>${entry[0]}:</strong> ${randomFact}`;
      }
      dataList.append(item);
    });
    let species = creature.species.toLowerCase();
    let curImageUrl = `/img/${species}.png`;
    let curImage = document.createElement("img");
    curImage.src = curImageUrl;
    document.querySelector(`#field-${index}`).append(curImage, dataList);
  });
};

const handleFormSubmit = (event) => {
  event.preventDefault();
  let elements = event.target.elements;
  let human = new Human(
    "Human",
    +elements.height.value,
    +elements.weight.value,
    elements.diet.value,
    elements.where.value,
    elements.when.value,
    [
      "The human species is one that is not able to think far enough.",
      "Human are pseudo-intelligent apes.",
    ]
  );
  human.name = elements.name.value;

  let creatureList = fetchCreatures(human);
  document.querySelector("body").append(createBaseGrid(creatureList));

  // Initial grid
  let type = "default";
  creatureList = sortList(creatureList, type);
  fillGrid(creatureList);

  // Hide form
  event.target.classList.add("hidden");

  document.querySelector(".grid").classList.remove("hidden");
};

const createForm = () => {
  let form = document.createElement("form");
  form.name = "ownProperties";
  form.id = "ownProperties";
  form.addEventListener("submit", handleFormSubmit);
  let lbName = document.createElement("label");
  lbName.htmlFor = "name";
  lbName.innerText = "Name: ";
  let ipName = document.createElement("input");
  ipName.id = "name";
  ipName.name = "name";
  ipName.placeholder = "Your name";
  form.append(lbName, ipName);

  let lbHeight = document.createElement("label");
  lbHeight.htmlFor = "height";
  let ipHeight = document.createElement("input");
  ipHeight.type = "range";
  ipHeight.min = 0;
  ipHeight.max = 250;
  ipHeight.id = "height";
  ipHeight.name = "height";
  ipHeight.defaultValue = 180;
  lbHeight.innerText = `Height: ${ipHeight.value} cm`;
  ipHeight.addEventListener('change', (event) => {
      lbHeight.innerText = `Height: ${event.target.value} cm`
  })
  form.append(lbHeight, ipHeight);

  let lbDiet = document.createElement("label");
  lbDiet.htmlFor = "diet";
  lbDiet.innerText = "Diet: ";
  let ipDiet = document.createElement("select");
  let diets = ["herbavore", "carnivore", "omnivore"];
  diets.forEach((diet) => {
    let ipOption = document.createElement("option");
    (ipOption.value = diet), (ipOption.innerText = diet);
    ipDiet.appendChild(ipOption);
  });
  ipDiet.id = "diet";
  ipDiet.name = "diet";
  form.append(lbDiet, ipDiet);

  let lbWeight = document.createElement("label");
  lbWeight.htmlFor = "weight";
  let ipWeight = document.createElement("input");
  ipWeight.type = "range";
  ipWeight.min = 0;
  ipWeight.max = 250;
  ipWeight.id = "weight";
  ipWeight.name = "weight";
  ipWeight.defaultValue = 70;
  lbWeight.innerText = `Weight: ${ipWeight.value} kg`;
  ipWeight.addEventListener('change', (event) => {
      lbWeight.innerText = `Weight: ${event.target.value} kg`
  })
  form.append(lbWeight, ipWeight);

  let lbWhen = document.createElement("label");
  lbWhen.htmlFor = "when";
  lbWhen.innerText = "When: ";
  let ipWhen = document.createElement("input");
  ipWhen.type = "date";
  ipWhen.id = "when";
  ipWhen.name = "when";
  form.append(lbWhen, ipWhen);

  let lbWhere = document.createElement("label");
  lbWhere.htmlFor = "where";
  lbWhere.innerText = "Where: ";
  let ipWhere = document.createElement("input");
  ipWhere.type = "text";
  ipWhere.id = "where";
  ipWhere.name = "where";
  ipWhere.placeholder = "Duisburg";
  form.append(lbWhere, ipWhere);

  let submitButton = document.createElement("button");
  submitButton.id = "submitButton";
  submitButton.type = "submit";
  submitButton.innerText = "Compare me";
  form.append(submitButton);
  return form;
};

(() => {
  let heading = document.createElement("h1");
  heading.innerText = "Human vs X";
  document.querySelector("body").append(heading);
  document.querySelector("body").append(createForm());
})();
