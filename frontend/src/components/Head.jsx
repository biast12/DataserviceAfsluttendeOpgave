import React from 'react';
import { Helmet } from 'react-helmet';

const Head = ({ title, description, icon }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="icon" href={icon} />
  </Helmet>
);

export default Head;