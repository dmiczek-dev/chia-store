import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';

const DashboardWrapper = styled.main`
  display: grid;
  grid-template-areas: "navbar navbar"
                         "sidebar content";
`;

const ContentWrapper = styled.div`
  grid-area: content;
`;

const Dashboard = ({ children }) => {
    return (
        <DashboardWrapper>
            <Header/>
            <Sidebar/>
            <ContentWrapper>
                {children}
            </ContentWrapper>
        </DashboardWrapper>
    );
};

export default Dashboard;
