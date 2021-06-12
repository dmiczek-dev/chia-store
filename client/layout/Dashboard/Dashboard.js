import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';

const DashboardWrapper = styled.div`

`;

const Dashboard = ({ children }) => {
    return (
        <>
            <Header/>
            <Sidebar/>
            <DashboardWrapper>
                {children}
            </DashboardWrapper>
        </>
    );
};

export default Dashboard;
