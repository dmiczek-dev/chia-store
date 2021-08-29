import React from 'react';
import ActiveLink from '../ActiveLink/ActiveLink';

import {
    SidebarWrapper,
    MenuItem,
    MenuTitle,
    StyledHomeIcon,
    StyledWalletIcon,
    StyledAssignmentIcon,
    StyledSettingsIcon,
    StyledUsersIcon,
} from './Sidebar.styles';
import { getUserRole } from '../../utils/accessToken';

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <ActiveLink href="/app" activeClassName="active" passHref>
        <MenuItem>
          <StyledHomeIcon />
          <MenuTitle>
            Dashboard
          </MenuTitle>
        </MenuItem>
      </ActiveLink>
      <ActiveLink href="/app/buy" activeClassName="active" passHref>
        <MenuItem>
          <StyledWalletIcon />
          <MenuTitle>
            Kup ploty
          </MenuTitle>
        </MenuItem>
      </ActiveLink>
      <ActiveLink href="/app/orders" activeClassName="active" passHref>
        <MenuItem>
          <StyledAssignmentIcon />
          <MenuTitle>
            Zamówienia
          </MenuTitle>
        </MenuItem>
      </ActiveLink>
      <ActiveLink href="/app/settings" activeClassName="active" passHref>
        <MenuItem>
          <StyledSettingsIcon />
          <MenuTitle>
            Ustawienia
          </MenuTitle>
        </MenuItem>
      </ActiveLink>
        {getUserRole() === 'ADMIN' && (
            <ActiveLink href="/app/users" activeClassName="active" passHref>
                <MenuItem>
                    <StyledUsersIcon />
                    <MenuTitle>
                        Użytkownicy
                    </MenuTitle>
                </MenuItem>
            </ActiveLink>
        )}
    </SidebarWrapper>
  );
};

export default Sidebar;
