import React from 'react'
import styled from 'styled-components'
import { Header } from '../../components/Header/Header';

const DashboardWrapper = styled.div`
    
`

export const Dashboard = ({children}) => {
    return (
        <>
            <Header />
            <DashboardWrapper>
                {children}
            </DashboardWrapper>
        </>
    )
}
