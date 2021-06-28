import * as React from 'react';
import {Container, Navbar, NavbarBrand} from 'reactstrap';
import {Link} from 'react-router-dom';
import logo from '../content/simply.png';
import './NavMenu.css';

export default class NavMenu extends React.PureComponent<{}, {}> {
    public render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/"><img src={logo} alt={'logo'}/></NavbarBrand>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
