import React from 'react';
import InfoBox from '../../components/InfoBox/InfoBox';
import { CardCell, CardContentWrapper, CardDataTitle, CardDataValue, CardGridWrapper, FullWidthCard, Heading } from '../../styles/App.styles';

export default function Root ({setPageTitle}) {
    setPageTitle('Dashboard');
    return (
        <>
            <CardGridWrapper>
                <InfoBox title="W sumie wyplotowaliśmy" amount="20000+" subtitle="plotów typu k32"/>
                <InfoBox title="Wytworzona przestrzeń dyskowa" amount="2.5 PiB" subtitle="Ponad 2 petabajty"/>
                <InfoBox title="Nasza infrastruktura plotuje dziennie" amount="200+" subtitle="nieustannie pracując przez 24h"/>
                <InfoBox title="Sieć Chia" amount="26 EiB" subtitle="Ponad 26 eksabajtów"/>
                <InfoBox title="Cena za 1 sztukę Chia" amount="1100 zł" subtitle="Ostatnia aktualizacja 2021-06-13"/>
                <InfoBox title="Zmiana ceny w 24h" amount="-83 zł" subtitle="Ostatnia aktualizacja 2021-06-13"/>
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
                    </CardCell> <CardCell>
                    <CardDataTitle>Data zmaówienia:</CardDataTitle>
                    <CardDataValue tag="date">2021-12-1</CardDataValue>
                </CardCell>
                </CardContentWrapper>
            </FullWidthCard>
            Ostatnie zamówienie (coś na wzór informacji z aplikacji Chia)
        </>
    );
}
