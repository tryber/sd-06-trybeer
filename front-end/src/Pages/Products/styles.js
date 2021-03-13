import styled from 'styled-components';

const Container = styled.div`
  > section {
    width: 100%;
    height: 100%;

    padding: 70px 10px 0 10px;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    @media (max-width: 500px) {
      padding: 70px 20px 0 20px;
    }
  }
`;

export default Container;
