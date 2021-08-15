import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import useAuth from '../../hooks/useAuth';

const DashboardWrapper = styled.main`
  display: grid;
  height: 100vh;
  grid-template-areas: "navbar navbar"
"sidebar content";
  grid-template-rows: 6.3rem minmax(0, 1fr);
  grid-template-columns: 14.90rem minmax(0, 1fr);
  min-height: 0;
  min-width: 0;
`;

const ContentWrapper = styled.div`
  grid-area: content;
  margin: 1rem;
  overflow: auto;
  padding: 1rem;
`;

export const TitleContext = React.createContext(null);

const Dashboard = ({ children }) => {
    const [title, setTitle] = useState();

    const loading = useAuth();
    if (loading) {
        return (<div>...loading</div>);
    }

    return (
        <DashboardWrapper>
            <TitleContext.Provider value={{title, setTitle}}>
                <Header/>
                <Sidebar/>
                <ContentWrapper>
                    {children}
                </ContentWrapper>
            </TitleContext.Provider>

        </DashboardWrapper>
    );
};

export default Dashboard;
