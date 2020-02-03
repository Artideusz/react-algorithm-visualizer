import { maxElementValue, singleElementWidth } from './util.js';

class Screen {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
    }
    drawElements(input) {
        this[input.type](input);
    }
    bars(input) {
        let elements = input.array;
        this.ctx.clearRect(0, 0, this.width, this.height);
        for(let i = 0 ; i < elements.length; i++) {
            let x = singleElementWidth(elements, this.width) * i;
            let w = singleElementWidth(elements, this.width);
            let h = this.height;
            let y = this.height - (elements[i].value / maxElementValue(elements)) * this.height;
            this.ctx.fillStyle = (input.activeIndexes.includes(i))?'#ff0000':elements[i].rgb;
            this.ctx.fillRect(x, y, w, h);
        }
    }
    points(input) {
        let elements = input.array;
        this.ctx.clearRect(0, 0, this.width, this.height);
        for(let i = 0 ; i < elements.length; i++) {
            let x = singleElementWidth(elements, this.width) * i;
            let w = singleElementWidth(elements, this.width);
            let y = this.height - (elements[i].value / maxElementValue(elements)) * this.height;
            this.ctx.fillStyle = (!input.activeIndexes.includes(i))?elements[i].rgb:'#ff0000';
            this.ctx.fillRect(x, y, w, w);
        }
    }

}

export default Screen;