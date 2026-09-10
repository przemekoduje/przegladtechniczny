import React from 'react';
import { Helmet } from 'react-helmet-async';

const LocalBusinessSchema = () => {
    const schemaData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": ["ProfessionalService", "LocalBusiness"],
                "@id": "https://przeglady-domu.online/#business",
                "name": "Przeglądy Techniczne Nieruchomości – Inżynier Przemysław Rakotny",
                "image": "https://przeglady-domu.online/images/v2/hh_desktop6.png",
                "url": "https://przeglady-domu.online/",
                "telephone": "+48690029414",
                "email": "kontakt@przeglady-domu.online",
                "priceRange": "$$",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Pukowca 2",
                    "addressLocality": "Gliwice",
                    "postalCode": "44-100",
                    "addressRegion": "Śląskie",
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
                "description": "Profesjonalne przeglądy budowlane (1-roczne i 5-letnie), kontrole instalacji gazowych, elektrycznych i wentylacji na terenie Gliwic, Katowic i całej Aglomeracji Śląskiej.",
                "areaServed": [
                    "Gliwice", "Katowice", "Zabrze", "Bytom", "Ruda Śląska",
                    "Chorzów", "Tychy", "Sosnowiec", "Dąbrowa Górnicza",
                    "Tarnowskie Góry", "Mikołów", "Jaworzno", "Piekary Śląskie",
                    "Pyskowice", "Rybnik", "Górnośląsko-Zagłębiowska Metropolia"
                ].map(city => ({
                    "@type": "City",
                    "name": city
                })),
                "founder": {
                    "@type": "Person",
                    "name": "Przemysław Rakotny",
                    "jobTitle": "Inżynier Budownictwa / Kontroler Obiektów Budowlanych",
                    "hasCredential": [
                        {
                            "@type": "EducationalOccupationalCredential",
                            "credentialCategory": "degree",
                            "name": "Uprawnienia budowlane nr SLK/2122/OWOK/08",
                            "recognizedBy": {
                                "@type": "Organization",
                                "name": "Polska Izba Inżynierów Budownictwa"
                            }
                        },
                        {
                            "@type": "EducationalOccupationalCredential",
                            "credentialCategory": "license",
                            "name": "Centralny Rejestr Charakterystyki Energetycznej Budynków nr 38909"
                        }
                    ]
                },
                "employee": {
                    "@type": "Person",
                    "name": "Marcin Wróbel",
                    "jobTitle": "Inżynier Elektryk / Pomiary Instalacji",
                    "hasCredential": {
                        "@type": "EducationalOccupationalCredential",
                        "name": "Uprawnienia elektryczne SEP E-1/1276/691/22, D-1/1277/691/22"
                    }
                }
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

export default LocalBusinessSchema;

