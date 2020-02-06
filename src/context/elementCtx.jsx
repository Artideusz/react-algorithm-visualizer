import React, { createContext, useState } from "react";
import { VisualElement } from "../logic/element_related/VisElement";
import { randomRange } from "../logic/util";
import { updateColor } from "../logic/element_related/colors";

export const ElementContext = createContext();

export function ElementProvider(props) {
	const initialValue = {
		array: Array(window.innerWidth <= 500 ? 20 : 100)
			.fill(null)
			.map(v => new VisualElement(randomRange(1, 500))),
		activeIndexes: [],
		color: "plain-white",
		maxHeight: 500
	};
	//Element storage
	const [elements, setElements] = useState(initialValue);

	const [visual, setVisual] = useState("bars");

	function setElementsCount(size) {
		let arr = Array(+size)
			.fill(null)
			.map(_ => new VisualElement(randomRange(1, elements.maxHeight)));
		setElements(prev => ({
			...prev,
			array: updateColor(arr, prev.color)
		}));
	}

	function setElementsColor(clr) {
		setElements(prev => ({
			...prev,
			array: updateColor(elements.array, clr),
			color: clr
		}));
	}

	function setElementsHeight(height) {
		setElements(prev => ({
			...prev,
			maxHeight: height,
			array: updateColor(
				prev.array.map(v => {
					v.value = randomRange(1, height);
					return v;
				}),
				prev.color
			)
		}));
	}

	return (
		<ElementContext.Provider
			value={{
				elements,
				setElements,
				setElementsColor,
				setElementsCount,
				setElementsHeight,
				visual,
				setVisual
			}}
		>
			{props.children}
		</ElementContext.Provider>
	);
}
