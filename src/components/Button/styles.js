import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.button`
  margin: 5px 0 0;
  height: 44px;
  background: ${props => props.backgroundColor};
  font-weight: bold;
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-size: 16px;
  transition: background 0.2s;

  &:hover {
    background: ${props => darken(0.03, props.backgroundColor)};
  }
`;
