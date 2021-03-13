import styled, { css } from 'styled-components';

const Container = styled.div`
  ${() => css`
    width: 200px;
    height: 250px;
    padding: 10px;
    margin-bottom: 20px;
    margin-left: 10px;
    margin-right: 10px;
    border: none;
    border-radius: 5px;
    box-shadow: 0 0 5px black;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media (max-width: 500px) {
      width: 47.5%;
      margin-left: 0;
      margin-right: 0;
    }
  `}
`;

const Price = styled.div`
  font-weight: 500;
`;

const Image = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  > img {
    height: 120px;
  }
`;

const Description = styled.div`
  margin-bottom: 10px;
  text-align: center;
  font-size: 15px;
  font-weight: 500;
`;

const Counter = styled.div`
  width: 100%;
  height: 35px;
  flex: inherit;
  display: flex;
  align-items: center;
  justify-content: space-around;

  > div {
    font-size: 20px;
    border: 1px solid black;
    border-radius: 3px;
    padding: 1px 5px;
  }

  > button {
    font-size: 40px;
    background: none;
    border: none;

    cursor: pointer;

    transition: opacity 0.3s;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export default {
  Container,
  Price,
  Image,
  Description,
  Counter,
};
