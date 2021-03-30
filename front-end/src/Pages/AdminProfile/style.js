import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const WrapperMenu = styled.div`
  width: 20%;
  height: 100vh;
`;

export const Profile = styled.div`
  text-align: center;
  background-color: #3700B3;
  border-radius: 8px;
  padding: 2%;
  color: white;
  p {
    font-size: 17pt;
    margin: 15px 0;
    font-weight: lighter;
  }
  span {
    font-weight: bold;
    letter-spacing: 3px;
    font-size: 19pt;
  }
  h1 {
    color: #DDDDE4;
    font-size: 40pt;
    letter-spacing: 10px;
  }
`;

export const WrapperProfile = styled.div`
  background-color: #e3e3e3;
  width: 80%;
  height: 100vh;
  padding: 12% 2%;
  display: flex;
  flex-direction: column;
  align-items: center;

`;
