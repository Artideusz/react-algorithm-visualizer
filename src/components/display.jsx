import React, { Component } from "react";
import Screen from "../logic/screen.js";
import style from "../css/display.module.css";

class Display extends Component {

	componentDidMount() {

		const DisplayController = new Screen(this.refs.screen);

		const interval = () => {
			const {generator, setGenerator} = this.props.algorithm;
			const {setElements, visual} = this.props.elements;
			//Check if the generator exists and return iteration
			let result = generator && generator.next();


			if (result && result.done) {
				/* If generator is done, set gen to null */
				setGenerator(null);
			}

			setElements(prev => {
				let elems = result && !result.done ? result.value : prev;
				DisplayController.drawElements(elems, visual);
				return elems;
			});

			requestAnimationFrame(interval);
		};
		requestAnimationFrame(interval);
	}
	
	render() {
		return <div className={style["display"]} ref={'screen'}></div>;
	}
}

export default Display;
