import styled, { css } from 'styled-components';

const CompInput = styled.label`
  ${() => css`
    width: 100%;

    display: flex;
    flex-direction: column;

    font-size: 20px;
    font-weight: 450;

    > input {
      width: 400px;
      height: 40px;

      padding-left: 10px;
      font-size: 16px;

      margin: 5px 0 20px 0;

      border: none;
      border-radius: 5px;

      box-shadow: 0 0 2px 0;

      @media (max-width: 500px) {
        width: 100%;
      }
    }
  `}
`;

export default CompInput;
