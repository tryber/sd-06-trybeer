import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
const SButton = styled.button`
  padding: 15px;
  width: 100%;
  background-color: ${({ disabled }) => (disabled ? '#8B8AE5' : '#6665DD')};
  transition: 650ms;
  border: none;
  outline: none;
  cursor: ${({ disabled }) => (!disabled ? 'pointer' : 'default')};
  color: #DDDDE4;
  border-radius: 8px;
  text-align: center;
  margin: 2% 0;
  &:hover {
    filter: grayscale(40%);
  }
`;

export default SButton;
