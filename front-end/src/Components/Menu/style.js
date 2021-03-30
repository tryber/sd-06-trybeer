import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  padding: 2%;
  justify-content: space-between;
  background-color: #6665DD;
  align-items: center;
  position: relative;
`;

export const Title = styled.h2`
  font-size: 28pt;
  color: #DDDDE4;
`;

export const Image = styled.img`
  width: 65px;
  cursor: pointer;
`;

export const WrapperButtons = styled.div`

  
`;

export const Modal = styled.div`
  ${({ state }) => (!state
    ? 'opacity: 0; z-index: -10; transform: translateX(-100%) '
    : 'opacity: 1; z-index: 0; transform: translateX(0)')};
  display: flex;
  transition: 550ms;
  flex-direction: column;
  position: absolute;
  justify-content: space-around;
  bottom: -100vh;
  left: 0;
  width: 100%;
  max-width: 450px;
  background-color:#6665DD;
  // height: 100vh;
  height: 100vh;
`;
