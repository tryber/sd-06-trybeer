import styled from 'styled-components';

export const Container = styled.div`
  display: inline-block;
  padding: 2%;
  width: 100%;
  max-width: 900px;
  ${({ type }) => {
    if (type === 'checkbox') {
      return `
        display: inline;
        position: relative;
        top: 15px;
        p {
          text-align: center;
          font-size: 20pt;
        }
        input {
          height: 20px;
        }
      `;
    }
  }}
`;

export const Input = styled.input`
  width: 100%;
  min-height: 50px;
  border-radius: 3px;
  outline: none;
  border: 2px solid ${(props) => props.color};
  transition: 300ms;
  padding-left: 5px;
  font-size: 15pt;
  color: #6665DD; // color
  &:focus {
    border-color: #6665DD; // color
    transition: 300ms;

  }
`;

export const Text = styled.p`
  color: #6665DD; // color
  margin-bottom: 8px;
`;
