import React from 'react';
import { Helmet } from 'react-helmet-async';

const MetaHeader = ({
 title,
 description,
 keywords,
 ogTitle,
 ogDescription,
 ogImage,
 ogUrl,
 ogType = 'website',
 ogLocale = 'en_US',
}) => {
 return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} data-rh="true" />
      <meta name="keywords" content={keywords} data-rh="true" />
      {/* Open Graph meta tags for Facebook */}
      <meta property="og:title" content={ogTitle || title} data-rh="true" />
      <meta property="og:description" content={ogDescription || description} data-rh="true" />
      <meta property="og:image" content={ogImage} data-rh="true" />
      <meta property="og:url" content={ogUrl} data-rh="true" />
      <meta property="og:type" content={ogType} data-rh="true" />
      <meta property="og:locale" content={ogLocale} data-rh="true" />
    </Helmet>
 );
};

export default MetaHeader;
