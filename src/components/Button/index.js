import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Button({
  className,
  backgroundColor,
  buttonText,
  ...rest
}) {
  return (
    <Container
      className={className}
      backgroundColor={backgroundColor}
      {...rest}
    >
      {buttonText}
    </Container>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  backgroundColor: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
};

Button.defaultProps = {
  className: '',
};
