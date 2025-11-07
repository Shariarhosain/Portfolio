import React from 'react';
import { Helmet } from 'react-helmet-async';
import { personalInfo } from '../data/portfolio';

const SEOHead = ({ pageTitle, pageDescription, pageKeywords, canonicalUrl }) => {
  const {
    name,
    seo: {
      metaTitle,
      metaDescription,
      metaKeywords,
      ogTitle,
      ogDescription,
      ogType,
      twitterCard
    },
    website,
    location
  } = personalInfo;

  // Use page-specific data or fallback to default
  const title = pageTitle || metaTitle;
  const description = pageDescription || metaDescription;
  const keywords = pageKeywords || metaKeywords;
  const url = canonicalUrl || website;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": name,
    "jobTitle": "Backend Developer",
    "description": description,
    "url": website,
    "sameAs": [
      personalInfo.linkedin,
      personalInfo.github
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dhaka",
      "addressCountry": "Bangladesh"
    },
    "knowsAbout": [
      "Backend Development",
      "Node.js",
      "Express.js",
      "NestJS",
      "MongoDB",
      "PostgreSQL",
      "Microservices",
      "API Development",
      "Database Design",
      "System Architecture"
    ]
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={name} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={`${name} - Portfolio`} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:url" content={url} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="geo.region" content="BD-13" />
      <meta name="geo.placename" content="Dhaka" />
      <meta name="geo.position" content="23.8103;90.4125" />
      <meta name="ICBM" content="23.8103, 90.4125" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Additional Head Elements */}
      <meta name="theme-color" content="#0891b2" />
      <meta name="msapplication-TileColor" content="#0891b2" />
      <meta name="format-detection" content="telephone=no" />
    </Helmet>
  );
};

export default SEOHead;