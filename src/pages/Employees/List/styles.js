import styled from 'styled-components';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;

  display: flex;
  flex-direction: column;

  header {
    display: flex;
    align-self: center;
    align-items: center;

    strong {
      color: #fff;
      font-size: 24px;
      margin: 0 15px;
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
  max-width: 54px;
  max-height: 54px;
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

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  svg {
    margin-right: 5px;
  }

  span {
    font-size: 16px;
    font-weight: bold;
  }
`;
