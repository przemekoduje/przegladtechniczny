import React from 'react';
import { Helmet } from 'react-helmet-async';

const CitySchema = ({ cityData }) => {
  if (!cityData) return null;

  const pageUrl = `https://przeglady-domu.online/przeglad-budowlany-${cityData.slug}`;

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["ProfessionalService", "LocalBusiness"],
        "@id": `${pageUrl}#business`,
        "name": `Przeglądy Budowlane ${cityData.name} – Inżynier Przemysław Rakotny`,
        "url": pageUrl,
        "telephone": "+48690029414",
        "priceRange": "$$",
        "image": "https://przeglady-domu.online/images/v2/hh_desktop6.png",
        "description": cityData.seoDescription || `Inżynierskie przeglądy techniczne i budowlane w mieście ${cityData.name}. Uprawnienia budowlane SLK/2122/OWOK/08.`,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": cityData.name,
          "addressRegion": "Śląskie",
          "addressCountry": "PL"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": cityData.lat || 50.2945,
          "longitude": cityData.lng || 18.6714
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "08:00",
          "closes": "18:00"
        },
        "areaServed": [
          {
            "@type": "City",
            "name": cityData.name
          },
          {
            "@type": "AdministrativeArea",
            "name": "Górnośląsko-Zagłębiowska Metropolia"
          },
          {
            "@type": "State",
            "name": "Województwo Śląskie"
          }
        ],
        "founder": {
          "@type": "Person",
          "name": "Przemysław Rakotny",
          "jobTitle": "Inżynier Budownictwa / Audytor Energetyczny",
          "hasCredential": [
            {
              "@type": "EducationalOccupationalCredential",
              "credentialCategory": "degree",
              "name": "Uprawnienia budowlane do kierowania i kontroli robót budowlanych",
              "recognizedBy": {
                "@type": "Organization",
                "name": "Śląska Okręgowa Izba Inżynierów Budownictwa"
              }
            },
            {
              "@type": "EducationalOccupationalCredential",
              "credentialCategory": "license",
              "name": "Centralny Rejestr Charakterystyki Energetycznej Budynków nr 38909"
            }
          ]
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": `Usługi kontroli technicznej – ${cityData.name}`,
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": `Przegląd 5-letni budynku ${cityData.name}`,
                "description": "Kompleksowa kontrola stanu technicznego i przydatności do użytkowania obiektu budowlanego zgodnie z art. 62 Prawa Budowlanego."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": `Przegląd roczny budynku ${cityData.name}`,
                "description": "Okresowa kontrola elementów narażonych na szkodliwe wpływy atmosferyczne i niszczące działania czynników występujących podczas użytkowania."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": `Przegląd instalacji gazowej i wentylacji ${cityData.name}`,
                "description": "Próba szczelności instalacji gazowej oraz pomiary skuteczności wentylacji grawitacyjnej i mechanicznej."
              }
            }
          ]
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Strona Główna",
            "item": "https://przeglady-domu.online/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Przeglądy Budowlane",
            "item": "https://przeglady-domu.online/przeglad-budowlany"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": `Przegląd Budowlany ${cityData.name}`,
            "item": pageUrl
          }
        ]
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};

export default CitySchema;
