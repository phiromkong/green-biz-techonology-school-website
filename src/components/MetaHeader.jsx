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
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {/* Open Graph meta tags for Facebook */}
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:locale" content={ogLocale} />
    </Helmet>
 );
};

export default MetaHeader;
