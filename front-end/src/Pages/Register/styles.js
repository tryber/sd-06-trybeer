import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > form {
    padding: 20px 30px 10px 30px;

    border-radius: 5px;
    box-shadow: 0 0 5px black;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > h1 {
      margin-bottom: 20px; 
    }

    .label-checkBox {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 100%;

      margin-bottom: 20px;

      font-size: 18px;
      font-weight: 500;

      .input-checkBox {
        width: 20px;
        height: 20px;

        font-size: 16px;

        margin-right: 10px;

        border: none;
        border-radius: 5px;

        box-shadow: 0 0 2px 0;
      }
    }

    @media (max-width: 500px) {
      border: none;

      width: 100%;
      height: 100%;

      padding: 2rem;

    }
  }
`;

export default Container;
