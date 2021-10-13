import React, {useContext, useEffect} from 'react';
import InfoBox from '../../components/InfoBox/InfoBox';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import {getUserRole} from "../../utils/accessToken";
import {useFetch} from "../../hooks/useFetch";
import {TitleContext} from "../../layout/Dashboard/Dashboard";

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

const CardDataTitle = styled.p``;

const CardDataValue = styled.p``;

const Heading = styled.h2`
  margin-bottom: 2rem;
`;

export default function Root() {
    const { setTitle } = useContext(TitleContext);
    useEffect(() => {
        setTitle('dashboard');
    }, []);
    // const {netspaceAPI} = useFetch('https://api.chiaprofitability.com/netspace', false, {}, {}, true)
    // const {priceAPI} = useFetch('https://api.chiaprofitability.com/market', false, {}, {}, true)

    const parseByte = (bytes) => {
        return Math.floor(bytes / Math.pow(2, 60),);
    }
    const parsed = parseByte(37945867761838514000)

    const lastUpdate = new Date(1628275110 * 1000).toLocaleDateString(
        'pl-PL'
    );

    const parseChange = (daychange) => {

        let parsed = Math.round(daychange * 10) / 10
        if (parsed > 0) {
            parsed = `+${parsed}`
        }
        return parsed
    }

    const daychange = parseChange(-10.799641311552)

    const url = process.env.NEXT_PUBLIC_URL + (getUserRole() === 'ADMIN' ? 'admin/orders' : 'user/orders');
    const {data} = useFetch(url, true, null, {method: 'GET'}, true);

    return (
        <>
            <CardGridWrapper>
                {/*<InfoBox title="W sumie wyplotowaliśmy" amount="20000+" subtitle="plotów typu k32"/>*/}
                {/*<InfoBox title="Wytworzona przestrzeń dyskowa" amount="2.5 PiB" subtitle="Ponad 2 petabajty"/>*/}
                {/*<InfoBox title="Nasza infrastruktura plotuje dziennie" amount="200+"*/}
                {/*         subtitle="nieustannie pracując przez 24h"/>*/}
                <InfoBox title="Sieć Chia" amount={`${parsed}`} subtitle={`Ponad ${parsed} eksabajtów`}/>
                <InfoBox title="Cena za 1 sztukę Chia" amount={`267.00 $USD`}
                         subtitle={`Ostatnia aktualizacja: ${lastUpdate}`}/>
                <InfoBox title="Zmiana ceny w 24h" positive={!!daychange} amount={`${daychange}%`}
                         subtitle="Ostatnia aktualizacja 2021-06-13"/>
            </CardGridWrapper>
            <FullWidthCard>
                <Heading>Ostatnie zamówienie:</Heading>
                {data &&
                <CardContentWrapper>
                    <CardCell>
                        <CardDataTitle>Produkt:</CardDataTitle>
                        <CardDataValue>{data[0].name}</CardDataValue>
                    </CardCell>
                    <CardCell>
                        <CardDataTitle>Data zmaówienia:</CardDataTitle>
                        <CardDataValue tag="date">{new Date(data[0].date).toLocaleDateString(
                            'pl-PL',
                            {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            },
                        )}</CardDataValue>
                    </CardCell>
                    <CardCell>
                        <CardDataTitle>Kwota:</CardDataTitle>
                        <CardDataValue>{data[0].total_price} PLN</CardDataValue>
                    </CardCell>
                    <CardCell>
                        <CardDataTitle>Ilość plotów:</CardDataTitle>
                        <CardDataValue>{data[0].plots}</CardDataValue>
                    </CardCell>
                </CardContentWrapper>

                }
            </FullWidthCard>
        </>
    );
}