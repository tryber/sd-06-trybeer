import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  padding: 2%;
  flex-direction: column;
  align-content: center;
  background-color: #3700B3;
  align-items: center;
  position: relative;
  justify-content: space-between;
`;

export const Title = styled.h2`
  font-size: 33pt;
  color: #DDDDE4;
  margin: 5%;
`;

export const WrapperButtons = styled.div`
  margin-bottom: 70%; 
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

export const ButtonLeave = styled.div`
  ${'' /* position: absolute;
  bottom: 0px; */}
  display: flex;
  width: 100%;
  align-self: flex-end;
  align-items: center;
  margin: 5px;
  margin-top: 70%; 
`;
