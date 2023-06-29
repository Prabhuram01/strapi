/*
 *
 * HomePage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';
import { BaseHeaderLayout, Box,HeaderLayout, Breadcrumbs, Crumb } from 
'@strapi/design-system';
import InputForm from '../../components/InputForm/InputForm';

const HomePage = () => {
  return (
    <>
      <Box background="neutral100">
        <BaseHeaderLayout title="Audit Logs Plugin" subtitle={<Breadcrumbs label="folders">
          <Crumb>Plugin For User Analytics</Crumb>
        </Breadcrumbs>} as="h2" />
      </Box>
      <div>
        <InputForm />
      </div>
    </>

  );
};

export default HomePage;
