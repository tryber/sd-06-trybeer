import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  padding: 2%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Item = styled.div`
  margin: 20px 0;
  font-size: 30pt;
  border: 5px solid #6665DD;
  width: 100%;
  max-width: 800px;
  transition: 0.4s;
  span {
    display: flex;
    justify-content: space-between;
    padding: 2%;
  }
  a {
    text-decoration: none;
    color: #575761;
    font-size: 15pt;
    font-weight: bolder;
  }
  &:hover {
    transition: 0.4s;
    background-color: #6665DD;
    border-color: #575761;
    a {
      color: white;
    }
  }
`;
