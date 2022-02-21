/**
 * Creates form fields as given.
 *
 * @param element
 * @param type
 * @param name
 * @param label
 * @returns Node or string
 */
const createChild = (element, type, name, label) => {
    let el = document.createElement(element);
    switch (element) {
        case "input":
            if (label) {
                // TODO Add label to an input field
            }
            el.setAttribute('type', type);
            // TODO Add options
            switch (type) {
                case 'range':
                    break;
                case 'select':
                    break;
                default:
                    break;
            }
            el.setAttribute('name', name);
            return el;
        default:
            return '';
    }
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
        type: "range",
        opts: {
            min: 0,
            max: 10,
            default: 5,
        },
        name: "height",
        label: true,
    },
    {
        element: "input",
        type: "range",
        opts: {
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
                name: 'herbavore'
            },
            {
                name: 'omnivore'
            },
            {
                name: 'carnivore'
            }
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
        element: "input",
        type: "text",
        name: "fact",
        label: false,
    },
];
(function () {
    let form = document.querySelector("body");
    formElements.map((el) => form?.append(createChild(el.element, el.type, el.name, el.label)));
})();
