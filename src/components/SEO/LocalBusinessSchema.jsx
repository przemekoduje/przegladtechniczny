import React from 'react';
import { Helmet } from 'react-helmet-async';

const LocalBusinessSchema = () => {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Przegląd Techniczny - Inżynier Przemysław Rakotny",
        "image": "https://przeglady-domu.online/images/v2/hh_desktop6.png",
        "@id": "https://przeglady-domu.online/",
        "url": "https://przeglady-domu.online/",
        "telephone": "+48690029414",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Pukowca 2",
            "addressLocality": "Gliwice",
            "postalCode": "44-100",
            "addressCountry": "PL"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 50.2945,
            "longitude": 18.6714
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
            ],
            "opens": "08:00",
            "closes": "18:00"
        },
        "sameAs": [
            "https://www.facebook.com/przegladtechniczny"
        ],
        "description": "Profesjonalne przeglądy techniczne nieruchomości w Gliwicach i na całym Śląsku. Przeglądy budowlane, gazowe, elektryczne i wentylacyjne. Roczne i pięcioletnie kontrole budynków."
    };

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(schemaData)}
            </script>
        </Helmet>
    );
};

export default LocalBusinessSchema;
