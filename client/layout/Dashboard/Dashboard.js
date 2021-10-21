import React, {useState} from 'react';
import styled from 'styled-components';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import useAuth from '../../hooks/useAuth';

const DashboardWrapper = styled.main`
  display: grid;
  grid-template-areas: "navbar navbar"
"sidebar content";
  grid-template-rows: 6.3rem minmax(0, 1fr);
  grid-template-columns: 12.86rem minmax(0, 1fr);
  min-height: 0;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
  border-radius: 5px;
  min-width: 74rem;
  max-width: 84rem;
  width: 70vw;
  height: 80vh;
  background: white;
  overflow: hidden;
  max-height: 47.5rem;
`;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle, rgba(143, 213, 166, 1) 0%, rgba(40, 167, 69, 1) 90%);
  height: 100vh;
`

const ContentWrapper = styled.div`
  grid-area: content;
  margin: 1rem;
  overflow: auto;
  padding: 1rem;
`;

export const TitleContext = React.createContext(null);

const Dashboard = ({children}) => {
    const [title, setTitle] = useState();

    const loading = useAuth();
    if (loading) {
        return (<div>...loading</div>);
    }

    return (
        <PageContainer>
            <DashboardWrapper>
                <TitleContext.Provider value={{title, setTitle}}>
                    <Header/>
                    <Sidebar/>
                    <ContentWrapper>
                        {children}
                    </ContentWrapper>
                </TitleContext.Provider>
            </DashboardWrapper>
        </PageContainer>
    );
};

export default Dashboard;
