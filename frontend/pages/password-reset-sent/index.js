import React from 'react';
import styled from 'styled-components';

import { H2 } from '../../src/components/Tyopgrahy';

const Section = styled.section`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PasswordResetSent = () => (
  <Section aria-labelledby="password-reset-sent-header">
    <H2 id="password-reset-sent-header">
      Password reset email sent! If your account exists it should be in your
      inbox shortly!
    </H2>
  </Section>
);

export default PasswordResetSent;
