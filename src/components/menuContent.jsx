import React from 'react';
import style from '../css/menu.module.css';

function MenuSelection({title, fn, options, def}) {
    return (
        <div>
            <label htmlFor={title}>{title}</label>
            <br/>
            <select className={style['menuInputSelect']} onChange={(e)=>{preventCall(e, fn)}} id={title} value={def}>
                {options.map((opt, i)=><option key={i} value={opt.value}>{opt.name}</option> )} 
            </select>
        </div>
    )
}

function MenuRange({ title, fn, range }) {
    return (
        <div>
            <label htmlFor={title}>{title}</label>
            <br/>
            <input className={style['menuInputNum']} type="number" onChange={(e)=>{preventCall(e, fn)}} min={range[0]} max={range[1]} defaultValue={range[2]} id={title}/>
        </div> );
}


function MenuButton({ title, fn }) {
    return (
        <button className={style['menuBtn']} onClick={(e)=>{preventCall(e, fn)}}>{title}</button>  
    );
}

function preventCall(e, cb) {
    e.preventDefault();
    cb(e.target.value);
}

export {
    MenuSelection,
    MenuRange,
    MenuButton
}