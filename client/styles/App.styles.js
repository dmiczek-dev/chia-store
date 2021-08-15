import styled from 'styled-components';
import Card from '@material-ui/core/Card';

export const CardGridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;
`;

export const FullWidthCard = styled(Card)`
  padding: 1rem;
  background-color: #e3e3e3;
`;

export const CardCell = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  //flex: 1 0 auto;
  margin-bottom: 2rem;

  &:nth-child(2n) {
    padding-left: 1rem;
  }

  &:nth-child(2n-1) {
    padding-right: 1rem;
  }

`;

export const CardContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const CardDataTitle = styled.p`
`;

export const CardDataValue = styled.p``;

export const Heading = styled.h2`
  margin-bottom: 2rem;
`;