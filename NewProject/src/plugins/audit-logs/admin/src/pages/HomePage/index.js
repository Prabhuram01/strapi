/*
 *
 * HomePage
 *
 */

import React from 'react';
import { Box } from
  '@strapi/design-system';
import InputForm from '../../components/InputForm/InputForm';
import { Typography } from '@strapi/design-system';

const HomePage = () => {
  return (
    <>
      <Box background="neutral100" paddingTop={6} paddingLeft={7}>
        <Typography variant="alpha">Audit Logs</Typography>
      </Box>
      <InputForm />
    </>

  );
};

export default HomePage;
