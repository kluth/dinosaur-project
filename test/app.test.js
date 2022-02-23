"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
describe('getChildren("input", "text", "dummy", true)', () => {
    it("should create the corresponding HTML block", () => {
        document.querySelector('body').innerHTML = '<div id="root"></div>';
        let name = "dummy";
        let type = "text";
        let element = "input";
        let label = true;
        //expect(document.getElementById('root')!.innerHTML).equals(`<label for="${name}">${name.toUpperCase()}</label><${element} type=${type} id=${name} name=${name}>`)
    });
});
