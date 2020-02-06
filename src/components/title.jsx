import React, { useContext } from 'react';
import { AlgorithmContext } from '../context/algorithmCtx';

function WebsiteTitle(props) {

    let { algorithm } = useContext(AlgorithmContext)

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