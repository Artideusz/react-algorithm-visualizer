import React, { useContext, useState } from 'react';
import { ElementContext } from '../context/elementCtx';
import { MenuSelection, MenuButton, MenuRange } from './menuContent';
import { colorList } from '../logic/element_related/colors';
import { scramble, fullRun, partRun } from '../logic/sort_functions';
import Sorts from '../logic/algorithms/sort';
import style from '../css/menu.module.css';
import Search from '../logic/algorithms/search';

function Menu(props) {

    const { elements, algorithm, setAlgorithm, setElements, setElementsColor, setElementsCount, setElementsHeight, setElementsType, generator, setGenerator } = useContext(ElementContext);

    const [menu, setMenu] = useState(0);

    const leftSet = { //Left set
        Visuals : (
            <ul>
                <li>
                    <MenuSelection title={'Color Theme:'} fn={e=>setElementsColor(e)} options={colorList} def={elements.color}/>
                </li>
                <li>
                    <MenuSelection title={'Visual Types:'} fn={e=>setElementsType(e)} options={['bars', 'points'].map(v=>({ name: v, value: v }))} def={elements.type}/>
                </li>
            </ul>
        ),
        'Array Settings' : (
            <ul>
                <li>
                    <MenuRange title={'Array Count:'} fn={e=> { e>=2 && e<=200 && setElementsCount(e) }} range={[2,200,elements.array.length]}/>
                </li>
                <li>
                    <MenuRange title={'Max Height:'} fn={e=> { e>10 && e<=1000 && setElementsHeight(e)}} range={[10,1000, elements.maxHeight]}/>
                </li>
            </ul>
        )
    }

    let rightSet = { //Right set
        'Sorting' : (
            <ul>
                <li>
                    <MenuButton title={generator?'Pause':'Play!'} fn={e=>generator ? setGenerator(null) : setGenerator(partRun(elements, algorithm, a=>a.value))}/>
                </li>
                <li>
                    <MenuButton title={'Scramble!'} fn={e=> setElements(prev=>({...prev, array: scramble(prev.array), activeIndexes: []})) }/>
                </li>
                <li>
                    <MenuButton title={'Sort!'} fn={e=> setElements(fullRun(elements, algorithm, a=>a.value))}/>
                </li>

                <li>
                    <MenuSelection title={'Sorting Type:'} fn={e=> { setAlgorithm(Sorts[e]) }} options={Sorts.map(v=>({ name: v.name, value: v.id }))} def={algorithm.id}/>
                </li>
            </ul>
        ),
        'Searching': (
            <ul>
                <li>
                    <MenuButton title={generator ? 'Pause' : 'Play!'} fn={e=>generator ? setGenerator(null) : setGenerator(partRun(elements, algorithm, elements.searchValue))}/>
                </li>
                <li>
                    <MenuButton title={'Scramble!'} fn={e=> setElements(prev=>({...prev, array: scramble(prev.array), activeIndexes: []})) }/>
                </li>
                <li>
                    <MenuButton title={'Search!'} fn={e=> setElements(fullRun(elements, algorithm, a=>a.value))}/>
                </li>
                <li>
                    <MenuSelection title={'Search Type:'} fn={e=> { setAlgorithm(Search[e]) }} options={Search.map(v=>({ name: v.name, value: v.id }))} def={algorithm.id}/>
                </li>
                <li>
                    <MenuRange title={'Value to search:'} fn={e=> { /* Set value to search for */ }} range={[10,1000, elements.searchValue]}/>
                </li>
            </ul>
        )
    }

    const set = props.side === 'left'? leftSet: rightSet;
    return (
        <div style={{[props.side]: 0}}>
            <div className={style['menuChanger']}>
                <button style={{ left: 0 }} onClick={(e)=>setMenu((prev)=> prev-1 >= 0? prev-1: Object.keys(set).length-1 )}>&lt;</button>
                <p>{Object.keys(set)[menu]}</p>
                <button style={{ right: 0 }} onClick={(e)=>setMenu((prev)=> prev+1 < Object.keys(set).length? prev+1: 0 )}>&gt;</button>
            </div>
            <div className={style['menu']}>
                {set[Object.keys(set)[menu]]}
            </div>
        </div>
    )
}
 
export default Menu;