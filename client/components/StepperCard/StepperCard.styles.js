import styled, { css } from 'styled-components';
import Icon from '@material-ui/core/Icon';

export const StepperCardWrapper = styled.div`
  margin: 50px .5rem 0;
  padding: 70px 30px 40px;
  background: rgba(40,167,69,0.25);
  border-radius: 10px;
  position: relative;
  min-width: 260px;
  opacity: 0.8;
  filter: grayscale(.8);

  * {
    pointer-events: none;
  }

  &:hover {
    cursor: pointer;
  }

  ${props => props.isSelected && css`
    opacity: 1;
    filter: none;
  `};
`;

export const CardIconWrapper = styled(Icon)`
  position: absolute;
  top: 0;
  left: 50%;
  margin: 0 auto;
  width: 100px;
  height: auto;
  background-color: rgba(28, 116, 48, 1);
  padding: 15px;
  border-radius: 80px;
  display: block;
  transform: translate(-50%, -50%);


  svg {
    width: 100%;
    height: 100%;
    object-fit: contain;
    fill: white;
    display: block;
  }
`;

export const CardIconTitle = styled.h2`
  text-transform: uppercase;
  color: #2D3142;
  font-weight: 400;
  font-size: 22px;
  text-align: center;
`;

export const StyledInput = styled.input`
  display: none;
`;
