import React, { createContext, useState } from 'react';
import { VisualElement } from '../logic/element_related/VisElement';
import { randomRange } from '../logic/util';
import { updateColor } from '../logic/element_related/colors';
import Sorts from '../logic/algorithms/sort';

export const ElementContext = createContext();

export function ElementProvider(props) {

    const initialValue = {
        array: Array(100).fill(null).map(v=> new VisualElement(randomRange(1, 500))),
        activeIndexes: [],
        color: 'plain-white',
        type: 'bars',
        maxHeight: 500,
        searchValue: 100
    }
    //Element storage
    const [elements, setElements] = useState(initialValue);
    const [generator, setGenerator] = useState(null);
    const [algorithm, setAlgorithm] = useState(Sorts[0]);

    function setElementsCount(size) {
        let arr = Array(+size).fill(null).map(_=> new VisualElement(randomRange(1, elements.maxHeight)));
        console.log(elements);
        setElements((prev)=>({
            ...prev,
            array: updateColor(arr, prev.color)
        }))
    }

    function setElementsColor(clr) {
        setElements(prev=>({
            ...prev,
            array: updateColor(elements.array, clr),
            color: clr
        }))
    }

    function setElementsType(type) {
        setElements(prev=>({
            ...prev,
            type
        }))
    }

    function setElementsHeight(height) {
        setElements(prev=>({
            ...prev,
            maxHeight: height,
            array: updateColor(prev.array.map(v=>{ v.value = randomRange(1, height); return v; }), prev.color)
        }))
    }

    return (
        <ElementContext.Provider value={{elements, setElements, algorithm, setAlgorithm, setElementsColor, setElementsCount, setElementsHeight, setElementsType, generator, setGenerator}}>
            {props.children} 
        </ElementContext.Provider>    
    )
}