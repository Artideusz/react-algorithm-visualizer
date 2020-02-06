import React, { createContext, useState } from "react";
import Sorts from "../logic/algorithms/sort";
import conditionList from '../logic/element_related/conditionList';

export const AlgorithmContext = createContext();

export function AlgorithmProvider(props) {
	const [algorithm, setAlgorithm] = useState(Sorts[0]);

	const [generator, setGenerator] = useState(null);

	const [condition, setCondition] = useState(conditionList[0]);

	return (
		<AlgorithmContext.Provider
			value={{
				algorithm,
				setAlgorithm,
				generator,
				setGenerator,
				condition,
				setCondition
			}}
		>
			{props.children}
		</AlgorithmContext.Provider>
	);
}
