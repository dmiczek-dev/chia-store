import styled from 'styled-components';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import WalletIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import AssignmentIcon from '@material-ui/icons/AssignmentOutlined';

export const SidebarWrapper = styled.nav`
  width: 14.95rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: calc(100vh - 8rem);
  background-color: white;
  box-shadow: 1px 0 3px 0 rgb(0 0 0 / 30%);
  grid-area: sidebar;
`;

export const MenuItem = styled.a`
  width: 100%;
  padding: 2rem 1rem;
  display: table-cell;
  text-align: center;
  vertical-align: middle;

  &.active {
    background-color: #e3e3e3;
  }

  &:hover {
    background-color: lightgray;
    cursor: pointer;
  }
`;

export const MenuTitle = styled.p`
  padding-top: 0.5rem;
  display: block;
  font-size: 1.7rem;
`;

export const StyledHomeIcon = styled(HomeIcon)`
  font-size: 3rem;
`;

export const StyledWalletIcon = styled(WalletIcon)`
    font-size: 3rem;
`

export const StyledAssignmentIcon = styled(AssignmentIcon)`
    font-size: 3rem;
`
