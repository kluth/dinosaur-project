import Human from "./classes/Human.js";
/**
 * Handles the form submit and creates
 * the human object.
 * After that it fills the grid, based on data
 *
 * @param event
 */
const handleFormSubmit = (event) => {
    event.preventDefault();
    document.querySelector("form")?.classList.add("hidden");
    let formData = new FormData(document.querySelector('form'));
    let formProps = Object.fromEntries(formData);
    let human = new Human("Human", parseFloat(formProps.height.toString()) || 5.9, parseFloat(formProps.weight.toString()) || 154, formProps.diet.toString() || "herbavore", formProps.where.toString() || "Ruhrgebiet", formProps.when.toString() || "Since the mid 80s", "Hello", 2, "Matthias");
    console.table(human);
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
                    newEl.setAttribute("max", parameter.max.toString());
                    newEl.setAttribute("min", parameter.min.toString());
                    newEl.setAttribute("default", parameter.default.toString());
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
                name: "herbavore",
            },
            {
                name: "omnivore",
            },
            {
                name: "carnivore",
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
        form?.append(createChild(currentElement.element, currentElement.name, currentElement.type, currentElement.label, currentElement.parameters, currentElement.opts));
    });
    return form;
};
/**
 * IIFE to create the form on load
 */
(() => {
    document.querySelector("body")?.append(createForm());
})();
