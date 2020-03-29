import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;

  display: flex;
  flex-direction: column;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    strong {
      color: #fff;
      font-size: 24px;
    }

    button {
      padding: 0 10px;
      margin: 5px 0 0;
      height: 44px;
      background: #3b9eff;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#3b9eff')};
      }
    }
  }

  ul {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
  }
`;

export const Employee = styled.li`
  a {
    color: initial;
    display: flex;
    flex-direction: row;
    padding: 20px;
    border-radius: 4px;
    background: #fff;
    margin-bottom: 10px;
  }
`;

export const Avatar = styled.img`
  width: 54px;
  height: 54px;
  border-radius: 50%;
  margin-right: 20px;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  > div {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  > p {
    color: #999;
    word-break: break-all;
  }
`;
