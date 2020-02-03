import React, { Component, createRef } from 'react';
import Screen from '../logic/screen.js';
import { ElementContext } from "../context/elementCtx";
import style from '../css/display.module.css'

class Display extends Component {
    
    static contextType = ElementContext; //Context of elementCtx where the elements are stored

    constructor(props) {
        super(props);
        this.canvasRef = createRef(); //This is a reference to the canvas so we could use it in scripts
    }
    componentDidMount() {
        // Initiate draw
        const canvas = this.canvasRef.current;
        canvas.width = window.innerWidth/1.5;
        canvas.height = window.innerHeight/1.5;
        const DisplayController = new Screen(canvas);
        this.interval = () => {
            let { setElements, generator, setGenerator } = this.context;
            //Check if the generator is null
            let result = generator && generator.next();

            if(result && result.done) {
                /* If generator is done, set gen to null */
                setGenerator(null);
            }
            setElements(prev=> {
                let elems = result && !result.done ? result.value : prev
                DisplayController.drawElements(elems);
                return elems
            });


            requestAnimationFrame(this.interval);
        }
        requestAnimationFrame(this.interval);
    }
    render() { 
        return (
            <canvas className={style['display']} ref={this.canvasRef}>HTML5 is not supported</canvas>
        );
    }
}
 
export default Display;