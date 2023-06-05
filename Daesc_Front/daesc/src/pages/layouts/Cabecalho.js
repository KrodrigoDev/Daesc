import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Navbar color="dark" dark expand="lg" className="px-4">
      <NavbarBrand href="/">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="https://github.com/Turma-Nassau/Kakau007_Daesc/blob/main/pingo-dagua.png?raw=true"
            alt="Daesc Logo"
            width="40"
            height="40"
            className="mr-2"
          />
          <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Daesc</span>
        </div>
      </NavbarBrand>

      <NavbarToggler onClick={toggle} />

      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/user/lista">Serviços Disponíveis</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/user/restrito">Administração</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;

