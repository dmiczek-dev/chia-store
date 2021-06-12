import React from 'react';
import styled from 'styled-components';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import ActiveLink from '../ActiveLink/ActiveLink';

// import {  } from './Sidebar.styles';

const SidebarWrapper = styled.nav`
  width: 14.95rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: calc(100vh - 8rem);
  background-color: white;
  box-shadow: 1px 0 3px 0 rgb(0 0 0 / 30%);
  grid-area: sidebar;
`;

const MenuItem = styled.a`
  width: 100%;
  padding: 2rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  &.active {
    background-color: #e3e3e3;
  }

  &:hover {
    background-color: lightgray;
    cursor: pointer;
  }
`;

const MenuTitle = styled.p`
  margin: 0.1rem 0 0rem 1rem;
  display: block;
  font-size: 1.7rem;
`;

const StyledHomeIcon = styled(HomeIcon)`
  width: 2rem;
  height: 2rem;
  font-size: 2rem;
`;

const Sidebar = () => {
    return (
        <SidebarWrapper>
            <ActiveLink href="/app" activeClassName="active" passHref>
                <MenuItem>
                    <StyledHomeIcon/>
                    <MenuTitle>
                        Dashboard
                    </MenuTitle>
                </MenuItem>
            </ActiveLink>
            <ActiveLink href="/app/buy" activeClassName="active" passHref>
                <MenuItem>
                    <StyledHomeIcon/>
                    <MenuTitle>
                        Kup ploty
                    </MenuTitle>
                </MenuItem>
            </ActiveLink>
            <MenuItem>Twoje zamówienia</MenuItem>
        </SidebarWrapper>
    );
};

export default Sidebar;
