import React, { useState } from 'react';
import Title from './components/title';
import Display from './components/display';
import Description from './components/description';
import { ElementProvider } from './context/elementCtx';
import Menu from './components/menu';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from './css/layout.module.css';
import { Container, Col, Row } from 'react-bootstrap';
import cx from 'classnames';

function App() {

    const isMobile = window.innerWidth <= 500;

    const [menu, setMenu] = useState({
        algorithms: false,
        visuals: false
    })

    const hideMenu = ()=> {
        if(menu.algorithms === true || menu.visuals === true) {
            setMenu({
                algorithms: false,
                visuals: false
            })
        }
    }

    if(isMobile) {
        return (
            <Container fluid={true} className={style['wrapper']}>
                <ElementProvider>
                    <Row>
                        <Col className={cx(style['menu-layout'], menu.visuals === true && style['menu-show'])}>
                            <Menu side={'left'}/>
                        </Col>
                        <Col className={style['display-layout']} onClick={hideMenu}>
                            <div className={style['mobile-buttons']}>
                                <button className={style['mobile-btn']} onClick={()=>setMenu({ visuals: true })}>Style</button>
                                <button className={style['mobile-btn']} onClick={()=>setMenu({ algorithms: true })}>Algos</button>
                            </div>
                            <Display/>
                            <Description/>
                        </Col>
                        <Col className={cx(style['menu-layout'], menu.algorithms === true && style['menu-show'])}>
                            <Menu side={'right'}/>
                        </Col>
                    </Row>
                </ElementProvider>
            </Container>
        );
    } else {
        return (
            <Container fluid={true} className={style['wrapper']}>
                <ElementProvider>
                    <Row>
                        <Col className={style['menu-layout']}>
                            <Menu side={'left'}/>
                        </Col>
                        <Col className={style['display-layout']} md={9}>
                            <Title/>
                            <Display/>
                            <Description/>
                        </Col>
                        <Col className={style['menu-layout']}>
                            <Menu side={'right'}/>
                        </Col>
                    </Row>
                </ElementProvider>
            </Container>
        );
    }
    
}
 
export default App;