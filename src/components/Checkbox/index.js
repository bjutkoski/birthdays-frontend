import React, { useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';

import { Container } from './styles';

export default function Checkbox({ label, name }) {
  const { defaultValue, registerField } = useField(name);
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name,
        ref: ref.current,
        path: 'checked',
      });
    }
  }, [ref.current, name]); // eslint-disable-line

  return (
    <Container htmlFor="checkbox">
      <input
        ref={ref}
        type="checkbox"
        id="checkbox"
        defaultChecked={defaultValue}
      />
      {label}
    </Container>
  );
}
