import styled from 'styled-components';

export const Container = styled.div`
  
`;

export const WrapperContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 2%;
`;

export const WrapperInputs = styled.div`
  max-width: 700px;

`;
export const Products = styled.div`
  border: 2px solid #6665DD;
  border-radius: 8px;
  max-width: 800px;
  padding: 2%;
  width: 100%;
  margin-bottom: 50px;
  text-align: end;
  > p {
    padding-top: 2%;
    color: #6665DD;
  }
`;

export const Product = styled.div`
  display: flex;
  width: 100%;
  max-width: 800px;
  justify-content: space-between;
  align-items: center;
  border: 1.5px solid #7675c7;
  border-radius: 8px;
  padding: 2%;
  button {
    width: 50px;
  }
`;

export const None = styled.p`
  font-size: 24pt;
  color: #6665DD;
`;
