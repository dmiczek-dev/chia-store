import React from 'react';
import Dashboard from '../../layout/Dashboard/Dashboard';
import SimpleCard from '../../components/SimpleCard/SimpleCard';

export default function Root() {
    return (
        <Dashboard>
            <SimpleCard title="W sumie wyplotowaliśmy" amount="20000+" subtitle="plotów typu k32"></SimpleCard>
            <SimpleCard title="Wytworzona przestrzeń dyskowa" amount="2 PB" subtitle="Ponad 2 petabajty"></SimpleCard>
            <SimpleCard title="Nasza infrastruktura plotuje dziennie" amount="200+" subtitle="nieustannie pracując przez 24h"></SimpleCard>
            <SimpleCard title="Sieć Chia" amount="22 EiB" subtitle="Ponad 2 eksabajty"></SimpleCard>
            <SimpleCard title="Cena za 1 sztukę Chia" amount="1400 zł" subtitle="Ostatnia aktualizacja 2021-06-13"></SimpleCard>
            <SimpleCard title="Zmiana ceny w 24h" amount="-583 zł" subtitle="Ostatnia aktualizacja 2021-06-13"></SimpleCard>
            Ostatnie zamówienie (coś na wzór informacji z aplikacji Chia)
        </Dashboard>
    );

}
