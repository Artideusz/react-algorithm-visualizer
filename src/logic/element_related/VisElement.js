import { rgb } from '../util.js';

class VisualElement {
    constructor(value, color = rgb(255,255,255)) {
        this.value = value;
        this.red = color.red;
        this.green = color.green;
        this.blue = color.blue;
        this.brightness = color.brightness;
        this.rgb = color.rgb;
    }
}



export {
    VisualElement
};