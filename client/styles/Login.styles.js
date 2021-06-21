import styled from 'styled-components';

export const LoginContainer = styled.div`
  min-height: 100vh;
  background: rgb(143, 213, 166);
  background: radial-gradient(circle, rgba(143, 213, 166, 1) 0%, rgba(40, 167, 69, 1) 90%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginWrapper = styled.div`
  background-color: #ffffff;
  min-width: 30rem;
  border-radius: 1rem;
  padding: 3rem 2.5rem;
  box-shadow: 0 3px 20px 8px #0c8346;
`;

export const Heading = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin: 0 0 2rem;
`;

export const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

