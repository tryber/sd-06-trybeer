import styled from 'styled-components';

export const Container = styled.div`
  border: 1px solid black;
  margin: 3%; 
  display: inline-block;
  padding: 2%;
  width: 100%;
  max-width: 900px;
`;

export const Price = styled.div`
color: #6665DD; // color
position:absolute;
margin-left:58%;
margin-top: -1%;
`;
export const PriceTotal = styled.div`
color: black; // color
font-weight: bolder;
position:absolute;
margin-left:30%;
margin-top: 10%;
`;
export const Buttons = styled.div`
  margin-top: 35px;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;

`;
export const Status = styled.span`
  color: ${({ isDisable }) => (isDisable ? 'green' : 'orange')};

`;
