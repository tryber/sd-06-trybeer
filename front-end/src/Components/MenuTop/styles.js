import styled, { css } from 'styled-components';

const CompMenuTop = styled.header`
  ${({ theme }) => css`
    width: 100%;
    height: 50px;

    z-index: 999;

    position: fixed;
    overflow: hidden;

    padding: 0 1rem;

    background: ${theme.colors.black};
    border-bottom: 3px solid ${theme.colors.green};

    display: flex;
    align-items: center;

    > button {
      background: none;
      
      padding: 2px 4px 0 4px;

      border: 1px solid ${theme.colors.white};
      border-radius: 3px;

      cursor: pointer;

      transition: filter 0.3s;

      &:hover {
        filter: brightness(0.8);
      }

      > img {
        width: 20px;
      }
    }

    > h2 {
      color: ${theme.colors.white};
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  `}
`;

export default CompMenuTop;
