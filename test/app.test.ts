import { expect } from 'chai';
describe('getChildren("input", "text", "dummy", true)', (): void => {
    it("should create the corresponding HTML block", (): void => {

        document.querySelector('body')!.innerHTML = '<div id="root"></div>'

        let name: string = "dummy"
        let type: string = "text"
        let element: string = "input"
        let label: boolean = true

        //expect(document.getElementById('root')!.innerHTML).equals(`<label for="${name}">${name.toUpperCase()}</label><${element} type=${type} id=${name} name=${name}>`)
    });
})