import React, {useEffect, useState} from 'react';
import Dashboard from '../../layout/Dashboard/Dashboard';
import SimpleCard from '../../components/SimpleCard/SimpleCard';

import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

//TODO: REFACTOR

const CardGridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;
`;

const FullWidthCard = styled(Card)`
  padding: 1rem;
  background-color: #e3e3e3;

`;

const CardCell = styled.div`
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

const CardContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const CardDataTitle = styled.p`
`;

const CardDataValue = styled.p``;

const Heading = styled.h2`
  margin-bottom: 2rem;
`

export default function Root () {

    const [data, setData] = useState({})

    useEffect(() => {
        const url = ''
        fetch(url)
        .then(response => response.json())
        .then(data => setData(data));

    }, [])

    return (
        <Dashboard>

            <CardGridWrapper>
                <SimpleCard title="W sumie wyplotowaliśmy" amount="20000+" subtitle="plotów typu k32"/>
                <SimpleCard title="Wytworzona przestrzeń dyskowa" amount="2.5 PiB" subtitle="Ponad 2 petabajty"/>
                <SimpleCard title="Nasza infrastruktura plotuje dziennie" amount="200+" subtitle="nieustannie pracując przez 24h"/>
                <SimpleCard title="Sieć Chia" amount="26 EiB" subtitle="Ponad 26 eksabajtów"/>
                <SimpleCard title="Cena za 1 sztukę Chia" amount="1100 zł" subtitle="Ostatnia aktualizacja 2021-06-13"/>
                <SimpleCard title="Zmiana ceny w 24h" amount="-83 zł" subtitle="Ostatnia aktualizacja 2021-06-13"/>
            </CardGridWrapper>
            <FullWidthCard>
                <Heading>Ostatnie zamówienie:</Heading>
                <CardContentWrapper>
                    <CardCell>
                        <CardDataTitle>Data zmaówienia:</CardDataTitle>
                        <CardDataValue tag="date">data.orderDate</CardDataValue>
                    </CardCell>
                    <CardCell>
                        <CardDataTitle>Data zmaówienia:</CardDataTitle>
                        <CardDataValue tag="date">2021-12-1</CardDataValue>
                    </CardCell>
                    <CardCell>
                        <CardDataTitle>Data zmaówienia:</CardDataTitle>
                        <CardDataValue tag="date">2021-12-1</CardDataValue>
                    </CardCell>
                    <CardCell>
                        <CardDataTitle>Data zmaówienia:</CardDataTitle>
                        <CardDataValue tag="date">2021-12-1</CardDataValue>
                    </CardCell>                    <CardCell>
                        <CardDataTitle>Data zmaówienia:</CardDataTitle>
                        <CardDataValue tag="date">2021-12-1</CardDataValue>
                    </CardCell>
                </CardContentWrapper>
            </FullWidthCard>
            Ostatnie zamówienie (coś na wzór informacji z aplikacji Chia)
        </Dashboard>
    );

}
