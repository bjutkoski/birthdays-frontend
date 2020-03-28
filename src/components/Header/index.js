import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { MdCake } from 'react-icons/md';
import { Container, Content, Profile } from './styles';

export default function Header() {
  const profile = useSelector(state => state.user.profile);

  return (
    <Container>
      <Content>
        <nav>
          <MdCake size={48} color="#204051" />
          <Link to="/dashboard">DASHBOARD</Link>
          <Link to="/employees">COLABORADORES</Link>
        </nav>
        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/profile">Meu Perfil</Link>
            </div>
            <img
              src={
                profile.avatar ||
                'https://api.adorable.io/avatars/50/abott@adorable.png'
              }
              alt="Avatar"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
