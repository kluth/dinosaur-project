import Human from "./classes/Human.js";
/**
 * Compares the diets
 *
 * @param dietA
 * @param dietB
 * @returns
 */
const checkDiets = (dietA, dietB) => {
  if (dietA === dietB) {
    return "This dino ate the same as you";
  }
  return `This dino ate something different than you. It was ${dietA}`;
};
/**
 * Compares the heights
 *
 * @param heightA
 * @param heightB
 * @returns
 */
const checkHeights = (heightA, heightB) =>
  `This dino is about ${Math.floor(heightA / heightB)} times as big as you.`;
/**
 * Compares the weights
 *
 * @param weightA
 * @param weightB
 * @returns
 */
const checkWeights = (weightA, weightB) =>
  `This dino is about ${Math.floor(weightA / weightB)} times of your mass.`;
/**
 * Creates a grid based on the information, given
 * via the creatures array
 *
 * @param creatures
 * @returns The grid filled with a lot of information
 */
const createGrid = (creatures) => {
  const grid = document.createElement("div");
  grid.id = "grid";
  // Iterate over all creatures
  grid.append(
    creatures.map((creature, index) => {
      const facts = [];
      let dietCompare;
      let heightCompare;
      let weightCompare;
      if (index !== 4 && creature.species !== "Pigeon") {
        dietCompare = checkDiets(creature.diet, creatures[4].diet);
        facts.push(dietCompare);
        heightCompare = checkHeights(creature.height, creatures[4].height);
        facts.push(heightCompare);
        weightCompare = checkWeights(creature.weight, creatures[4].weight);
        facts.push(weightCompare);
      }
      if (creature.species !== "Human") {
        facts.push(creature.fact);
      }
      const tile = document.createElement("div");
      tile.id = `tile-${index}`;
      tile.classList.add("card");
      const computedHTML = `
    <h2>${creature.name ? creature.name : creature.species}</h2>
        <img src="https://raw.githubusercontent.com/kluth/dinosaur-project/main/img/${creature.species.toLowerCase()}.png">
        <footer>
        ${
          creature.species !== "Human"
            ? facts[Math.floor(Math.random() * (facts.length - 1 - 0) + 0)]
            : ""
        }
        </footer>`;
      tile.innerHTML = computedHTML;
      return tile;
    })
  );
  return grid;
};
/**
 * Handles the form submit and creates
 * the human object.
 * After that it fills the grid, based on data
 *
 * @param event
 */
const handleFormSubmit = async (event) => {
  event.preventDefault();
  document.querySelector("form")?.classList.add("hidden");
  const formData = new FormData(document.querySelector("form"));
  const formProps = Object.fromEntries(formData);
  const human = new Human(
    "Human",
    parseFloat(formProps.height.toString()) || 5.9,
    parseFloat(formProps.weight.toString()) || 154,
    formProps.diet.toString() || "herbavore",
    formProps.where.toString() || "Ruhrgebiet",
    formProps.when.toString() || "Since the mid 80s",
    "Hello",
    formProps.name.toString() || "Matthias",
    2
  );
  /** ******************
   * DINOS PARSING
   ******************* */
  const creatures = [];
  await fetch(
    "https://raw.githubusercontent.com/kluth/dinosaur-project/main/dino.json"
  )
    .then((res) => res.json())
    .then((data) => {
      data.Dinos.map((dino) => {
        creatures.push(dino);
        return 0;
      });
    });
  creatures.splice(4, 0, human);
  document.querySelector("body")?.append(createGrid(creatures));
};
/**
 * Creates form fields as given.
 *
 * @param element
 * @param type?
 * @param name
 * @param label?
 * @param opts?
 * @returns Node or string
 */
const createChild = (element, name, type, label = false, parameter, opts) => {
  const container = document.createElement("div");
  container.classList.add("form-elements");
  const newEl = document.createElement(element);
  newEl.setAttribute("name", name);
  newEl.setAttribute("id", name);
  switch (element) {
    case "input":
    case "button":
      newEl.setAttribute("type", type || "");
      switch (type) {
        case "number":
          newEl.setAttribute("max", parameter.max.toString());
          newEl.setAttribute("min", parameter.min.toString());
          newEl.setAttribute("default", parameter.default.toString());
          newEl.setAttribute("step", "0.1");
          break;
        case "submit":
          newEl.innerText = name.toUpperCase();
          break;
        default:
          break;
      }
      break;
    case "select":
      opts?.map((option) => {
        const opElement = document.createElement("option");
        opElement.value = option.name;
        opElement.innerText = option.name.toUpperCase();
        newEl.append(opElement);
      });
      break;
    default:
      return;
  }
  if (label) {
    const lbl = document.createElement("label");
    lbl.htmlFor = name;
    lbl.innerText = name.toUpperCase();
    container.append(lbl);
  }
  container.append(newEl);
  document.querySelector("body").append(container);
};
// The form fields as an array of objects to iterate through
const formElements = [
  {
    element: "input",
    type: "text",
    name: "name",
    label: true,
  },
  {
    element: "input",
    type: "number",
    parameters: {
      min: 0,
      max: 10,
      default: 5,
    },
    name: "height",
    label: true,
  },
  {
    element: "input",
    type: "number",
    parameters: {
      min: 0,
      max: 300,
      default: 140,
    },
    name: "weight",
    label: true,
  },
  {
    element: "select",
    opts: [
      {
        name: "herbavor",
      },
      {
        name: "omnivor",
      },
      {
        name: "carnivor",
      },
    ],
    name: "diet",
    label: true,
  },
  {
    element: "input",
    type: "text",
    name: "where",
    label: true,
  },
  {
    element: "input",
    type: "text",
    name: "when",
    label: true,
  },
  {
    element: "button",
    type: "submit",
    name: "compare",
    label: false,
  },
];
/**
 * Creates the form for the user input and returns it
 *
 * @returns form for the user
 */
const createForm = () => {
  const form = document.createElement("form");
  form.addEventListener("submit", (event) => {
    handleFormSubmit(event);
  });
  form.append(
    formElements.map((currentElement) => {
      const el = createChild(
        currentElement.element,
        currentElement.name,
        currentElement.type,
        currentElement.label,
        currentElement.parameters,
        currentElement.opts
      );
      return el;
    })
  );
  return form;
};
/**
 * IIFE to append the form on load
 */
(() => {
  document.querySelector("body")?.append(createForm());
})();