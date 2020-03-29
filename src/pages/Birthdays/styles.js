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
  }

  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px;
    margin-top: 30px;
  }
`;

export const Birthday = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 4px;
  background: #fff;
`;

export const Avatar = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

export const SelectDate = styled.div`
  display: flex;
  align-self: center;
  align-items: center;

  button {
    border: 0;
    background: none;
  }

  strong {
    color: #fff;
    font-size: 24px;
    margin: 0 15px;
  }
`;
