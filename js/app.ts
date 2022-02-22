import Human from "./classes/Human.js";

/**
 * Compares the diets
 * 
 * @param dietA 
 * @param dietB 
 * @returns 
 */
const checkDiets = (dietA: string, dietB: string) => {
    if (dietA === dietB) {
        return 'This dino ate the same as you'
    }
    return `This dino ate something different than you. It was ${dietA}`
}

/**
 * Compares the heights
 * 
 * @param heightA 
 * @param heightB 
 * @returns 
 */
const checkHeights = (heightA: number, heightB: number) => {
    return `This dino is about ${Math.floor(heightA / heightB)} times as big as you.`
}

/**
 * Compares the weights
 * 
 * @param weightA 
 * @param weightB 
 * @returns 
 */
const checkWeights = (weightA: number, weightB: number) => {
    return `This dino is about ${Math.floor(weightA / weightB)} times of your mass.`
}

/**
 * Creates a grid based on the information, given
 * via the creatures array
 * 
 * @param creatures 
 * @returns The grid filled with a lot of information
 */
const createGrid = (
  creatures: {
    species: string;
    height: number;
    weight: number;
    diet: string;
    where: string;
    when: string;
    fact: string | string[];
    name?: string;
  }[]
): HTMLDivElement => {
  let grid = document.createElement("div");
  grid.id = "grid";

  // Iterate over all creatures
  creatures.map((creature, index) => {
    let facts: any = []
    let dietCompare: string | undefined
    let heightCompare: string | undefined
    let weightCompare: string | undefined
    if(index !== 4 && creature.species !== 'Pigeon') {
        dietCompare = checkDiets(creature.diet, creatures[4].diet)
        facts.push(dietCompare)
        heightCompare = checkHeights(creature.height, creatures[4].height)
        facts.push(heightCompare)
        weightCompare = checkWeights(creature.weight, creatures[4].weight)
        facts.push(weightCompare)
    }

    if (creature.species !== 'Human') {
        facts.push(creature.fact)
    }

    let tile = document.createElement("div");
    tile.id = `tile-${index}`;
    tile.classList.add("card");

    let computedHTML = `
    <h2>${creature.name ? creature.name : creature.species}</h2>
        <img src="img/${creature.species.toLowerCase()}.png">
        <footer>
        ${creature.species !== 'Human' ? facts[Math.floor(Math.random() * (facts.length - 1 - 0) + 0)] : ''}
        </footer>`;

    tile.innerHTML = computedHTML
    grid.append(tile);
  });

  return grid;
};

/**
 * Handles the form submit and creates
 * the human object.
 * After that it fills the grid, based on data
 *
 * @param event
 */
const handleFormSubmit = async (event: SubmitEvent) => {
  event.preventDefault();
  document.querySelector("form")?.classList.add("hidden");

  let formData = new FormData(document.querySelector("form")!);
  let formProps = Object.fromEntries(formData);

  let human = new Human(
    "Human",
    parseFloat(formProps.height.toString()) || 5.9,
    parseFloat(formProps.weight.toString()) || 154,
    formProps.diet.toString() || "herbavore",
    formProps.where.toString() || "Ruhrgebiet",
    formProps.when.toString() || "Since the mid 80s",
    "Hello",
    formProps.name.toString() || "Matthias",
    2,
  );


  /********************
   * DINOS PARSING
   ********************/
  let creatures: {
    species: string;
    height: number;
    weight: number;
    diet: string;
    where: string;
    when: string;
    fact: string | string[];
    name?: string;
  }[] = [];

  await fetch(
    "/dino.json"
  )
    .then((res) => res.json())
    .then((data) => {
      data.Dinos.map(
        (dino: {
          species: string;
          height: number;
          weight: number;
          diet: string;
          where: string;
          when: string;
          fact: string | string[];
          name?: string;
        }) => {
          creatures.push(dino);
        }
      );
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
const createChild = (
  element: string,
  name: string,
  type?: string,
  label: boolean = false,
  parameter?: {
    min?: number;
    max?: number;
    default?: number;
  },
  opts?: {
    name: string;
  }[]
): string | Node => {
  let container = document.createElement("div");
  container.classList.add("form-elements");
  let newEl = document.createElement(element);
  newEl.setAttribute("name", name);
  newEl.setAttribute("id", name);
  switch (element) {
    case "input":
    case "button":
      newEl.setAttribute("type", type || "");
      switch (type) {
        case "number":
          newEl.setAttribute("max", parameter!.max!.toString());
          newEl.setAttribute("min", parameter!.min!.toString());
          newEl.setAttribute("default", parameter!.default!.toString());
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
        let opElement = document.createElement("option");
        opElement.value = option.name;
        opElement.innerText = option.name.toUpperCase();
        newEl.append(opElement);
      });
      break;
  }
  if (label) {
    let lbl = document.createElement("label");
    lbl.htmlFor = name;
    lbl.innerText = name.toUpperCase();
    container.append(lbl);
  }
  container.append(newEl);
  return container;
};

// The form fields as an array of objects to iterate through
let formElements = [
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
  let form = document.createElement("form");
  form.addEventListener("submit", (event) => {
    handleFormSubmit(event);
  });

  formElements.map((currentElement) => {
    form?.append(
      createChild(
        currentElement.element,
        currentElement.name,
        currentElement.type,
        currentElement.label,
        currentElement.parameters,
        currentElement.opts
      )
    );
  });
  return form;
};

/**
 * IIFE to append the form on load
 */
(() => {
  document.querySelector("body")?.append(createForm());
})();
