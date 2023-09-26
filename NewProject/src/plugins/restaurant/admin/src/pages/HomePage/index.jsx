/*
 *
 * HomePage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';
import { BaseHeaderLayout, Box, Breadcrumbs, LinkButton, Crumb, ContentLayout, HeaderLayout } from '@strapi/design-system';
import RestaurantForm from '../../components/RestaurantForm/RestaurantForm';

const HomePage = () => {
  return (
    <Box background="neutral100">
      {/* <BaseHeaderLayout title="Restaurant" subtitle={<Breadcrumbs label="folders">
        <Crumb>Form</Crumb>
      </Breadcrumbs>} as="h2" /> */}
      {/* <ContentLayout>
        <RestaurantForm />
      </ContentLayout> */}
      <Box padding={5}>
        <LinkButton variant="default" href="http://127.0.01:8080/">
          Create WebStory
        </LinkButton>
      </Box>

    </Box>
  );
};

export default HomePage;
