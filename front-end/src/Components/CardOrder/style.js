import styled from 'styled-components';

export const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px;
  border-radius: 10px;
  border-style: groove;;
  width: 250px;
  height: 100px;
`;

export const SectionOrder = styled.div`
  display: flex;
  margin: 5px;
  align-items: start;
`;

export const SectionAdress = styled.div`
  display: flex;
  margin: 2px;
  align-items: center
`;

export const ValueOrder = styled.div`
  display: flex;
  margin: 5px;
  align-items: end;
`;

export const StatusOrder = styled.div`
  display: flex;
  margin: 5px;
  align-items: end;
`;

export const ValueAndStatus = styled.div`
display: flex;
margin: 2px;
align-items: end;
justify-content: space-between;
`;
