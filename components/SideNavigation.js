import React from 'react'
import SideNav, {Toggle, NavItem, NavIcon, NavText} from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

export const SideNavigation = () => {
  return <SideNav
    onSelect={selected => {
      console.log(selected);
    }}
    className='Side-nav'
    >
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected= 'services'>       
          <NavItem eventKey='documents'>
            <NavIcon><i class="fa fa-file" aria-hidden="true"></i></NavIcon>
            <NavText>Documentos</NavText>
              <NavItem eventKey='sign-documents'>
                <NavText>Firmar Documento</NavText>
              </NavItem>
              <NavItem eventKey='upload-documents'>
                <NavText>Cargar Documento</NavText>
              </NavItem>
          </NavItem>

          <NavItem eventKey='transfer-request'>
            <NavIcon><i class="fa fa-exchange" aria-hidden="true"></i></NavIcon>
            <NavText>Solicitud de Traslado</NavText>
          </NavItem>

          <NavItem eventKey='services'>
            <NavIcon><i class="fa fa-cog" aria-hidden="true"></i></NavIcon>
            <NavText>Servicios</NavText>
          </NavItem>
      
          <NavItem eventKey='participate-contests'>
            <NavIcon><i class="fa fa-trophy" aria-hidden="true"></i></NavIcon>
            <NavText>Participar en concursos</NavText>
          </NavItem>
      </SideNav.Nav>
    </SideNav>
}


