import styled from 'styled-components';

export const images = styled.div`
  width: 300 px;
 
`;

export const CardContainer = styled.div`
  justify-content: space-between;
  
  display: flex;
  flex-wrap: wrap;
  background-image: url(https://fuigosteicontei.com.br/wp-content/uploads/2015/12/praga-republica-tcheca-522-1068x710.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  `;

export const Card = styled.div`
  border: 1px solid white;
  background-color: #EEE9E9;
  width: 210px;
  height: 230px;
  border-radius: 15px;
  margin:1%;
  padding:.5%;
`;

export const Container = styled.div`
  justify-content: space-evenly;
  align-items: center;
  display: flex;
  flex-direction: row;
`;

export const Buttons = styled.div`
  margin: 5px;
  width: 50px;
  height: 50px;
`;

export const ItemImage = styled.img`
  height: 60px;
  margin-left:35%;
  margin-top:10%;
  
`;
export const Text = styled.p`
  display: flex;
  justify-content: center;
  color: black;
  font-weight: bold;
`;
export const QTD = styled.p`
  font-weight: bold;
  margin-top: -37%;
  margin-left: 45.9%;
`;
export const Cart = styled.div`
  position: relative;
  margin-top: 10%;
  margin-left:45%;
`;
