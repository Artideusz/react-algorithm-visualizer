import React, { useContext, useState } from 'react';
import { ElementContext } from '../context/elementCtx';
import { Button, Modal } from 'react-bootstrap';
import Prism from 'prismjs';
import '../css/prism.css';

function Description() {
    const { algorithm } = useContext(ElementContext);

    const [show, setShow] = useState(false);

    setTimeout(()=>Prism.highlightAll(), 0)

    return (
        <div>
            <Button variant='secondary' onClick={()=>setShow(true)}>About this algorithm...</Button>
            <Modal size='lg' show={show} onHide={()=>setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{algorithm.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {algorithm.description}
                    <pre>
                        <code className='language-javascript'>
                        {algorithm.descriptionCode}
                        </code>
                    </pre>
                </Modal.Body>
            </Modal>
        </div>
    )
}
 
export default Description;