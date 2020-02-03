import React, { useContext } from 'react';
import { ElementContext } from '../context/elementCtx';

function WebsiteTitle(props) {

    let { algorithm } = useContext(ElementContext)

    const style = {
        'textAlign': 'center',
        'color': '#ffffff'
    }

    return (
        <div>
        <h3 style={style}>Algorithm Visualizer</h3>
        <p style={style}>{algorithm.name}</p>
        </div> 
    );
}
 
export default WebsiteTitle;