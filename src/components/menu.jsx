import React, { useContext, useState } from "react";
import { ElementContext } from "../context/elementCtx";
import { MenuSelection, MenuButton, MenuRange } from "./menuContent";
import { colorList } from "../logic/element_related/colors";
import { visualsList } from "../logic/element_related/visuals";
import { scramble, fullRun, partRun } from "../logic/sort_functions";
import Sorts from "../logic/algorithms/sort";
import style from "../css/menu.module.css";
import Search from "../logic/algorithms/search";
import { AlgorithmContext } from "../context/algorithmCtx";
import conditionList from "../logic/element_related/conditionList";

function Menu(props) {
	const {
		elements,
		setElements,
		setElementsColor,
		setElementsCount,
		setElementsHeight,
		visual,
		setVisual
	} = useContext(ElementContext);

	const {
		algorithm,
		setAlgorithm,
		generator,
		setGenerator,
		condition,
		setCondition
	} = useContext(AlgorithmContext);

	const [menu, setMenu] = useState(0);

	//Done
	const leftSet = [
		{
			name: "Visuals",
			content: function() {
				return (
					<>
						<li>
							<MenuSelection
								title={"Color Theme:"}
								fn={e => setElementsColor(e)}
								options={colorList}
								def={elements.color}
							/>
						</li>
						<li>
							<MenuSelection
								title={"Visual Types:"}
								fn={e => setVisual(e)}
								options={visualsList}
								def={visual}
							/>
						</li>
					</>
				);
			}
		},
		{
			name: "Array Settings",
			content: function() {
				return (
					<>
						<li>
							<MenuRange
								title={"Array Count:"}
								fn={e => {
									e >= 2 && e <= 300 && setElementsCount(e);
								}}
								range={[2, 300, elements.array.length]}
							/>
						</li>
						<li>
							<MenuRange
								title={"Max Height:"}
								fn={e => {
									e >= 10 && e <= 1000 && setElementsHeight(e);
								}}
								range={[10, 1000, elements.maxHeight]}
							/>
						</li>
					</>
				);
			}
		}
	]; //Left set

	let rightSet = [
		{
			name: "Sorting",
			content: function() {
				if (algorithm.type !== "sort") {
					setAlgorithm(Sorts[0]);
					setGenerator(null);
					setCondition(conditionList[0])
				}

				const algorithmList = Sorts.map(v => ({
					name: v.name,
					value: v.id
				}));

				function findId(id) {
					return algorithmList.findIndex(v => v.value === id);
				}

				return (
					<>
						<li>
							<MenuButton
								title={"Sort!"}
								fn={e => setElements(fullRun(elements, algorithm, condition.src))}
							/>
						</li>
						<li>
							<MenuSelection
								title={"Sorting Type:"}
								fn={e => {
									setAlgorithm(Sorts[findId(+e)]);
								}}
								options={algorithmList}
								def={algorithm.id}
							/>
						</li>
						<li>
							<MenuSelection
								title={"Sort By:"}
								fn={e => {
									setCondition(conditionList[conditionList.findIndex(v=>v.value === e)])
								}}
								options={conditionList}
								def={condition.value}
							/>
						</li>
					</>
				);
			}
		},
		{
			name: "Searching",
			content: function() {
				if (algorithm.type !== "search") {
					setAlgorithm(Search[0]);
					setGenerator(null);
					setCondition({
						src: 100
					})
				}
				const algorithmList = Search.map(v => ({
					name: v.name,
					value: v.id
				}));

				function findId(id) {
					return algorithmList.findIndex(v => v.value === id);
				}

				return (
					<>
						<li>
							<MenuButton
								title={"Search!"}
								fn={e => setElements(fullRun(elements, algorithm, condition.src))}
							/>
						</li>
						<li>
							<MenuSelection
								title={"Search Type:"}
								fn={e => {
									setAlgorithm(Search[findId(+e)]);
								}}
								options={algorithmList}
								def={algorithm.id}
							/>
						</li>
						<li>
							<MenuRange
								title={"Value to search:"}
								fn={e => {
									setCondition({
										src: +e
									})
								}}
								range={[10, 1000, condition.src]}
							/>
						</li>
					</>
				);
			}
		}
	];
	// Right menu set fragment that all algorithms have
	let rightDefSet = (
		<>
			<li>
				<MenuButton
					title={generator ? "Pause" : "Play"}
					fn={e =>
						generator
							? setGenerator(null)
							: setGenerator(partRun(elements, algorithm, condition.src))
					}
				/>
			</li>
			<li>
				<MenuButton
					title={"Scramble!"}
					fn={e =>
						setElements(prev => ({
							...prev,
							array: scramble(prev.array),
							activeIndexes: []
						}))
					}
				/>
			</li>
		</>
	);

	// Setting Menu Set depending on the side
	const set = props.side === "left" ? leftSet : rightSet;

	return (
		<div style={{ [props.side]: 0 }}>
			<div className={style["menuChanger"]}>
				<button
					style={{ left: 0 }}
					onClick={e =>
						setMenu(prev =>
							prev <= 0 ? Object.keys(set).length - 1 : prev - 1
						)
					}
				>
					&lt;
				</button>
				<p>{set[menu].name}</p>
				<button
					style={{ right: 0 }}
					onClick={e =>
						setMenu(prev =>
							prev >= Object.keys(set).length - 1 ? 0 : prev + 1
						)
					}
				>
					&gt;
				</button>
			</div>
			<div className={style["menu"]}>
				<ul>
					{props.side !== "left" && rightDefSet}
					{set[menu].content()}
				</ul>
			</div>
		</div>
	);
}

export default Menu;
