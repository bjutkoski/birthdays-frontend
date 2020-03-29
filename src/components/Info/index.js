import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Info({ className, icon: Icon, text }) {
  return (
    <Container className={className}>
      <Icon size={18} color="#84a9ac" />
      <span>{text}</span>
    </Container>
  );
}

Info.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

Info.defaultProps = {
  className: undefined,
};
