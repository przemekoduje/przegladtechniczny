import React, { useMemo, useRef } from 'react';
import Map, { Source, Layer, Marker } from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { citiesData } from '../../helpers/citiesData';
import './SilesiaMapGL.scss';

// IMPORT PLIKÓW
import silesiaOutlineData from '../../assets/silesia1.json';
import silesiaCitiesData from '../../assets/silesia2.json';

const SilesiaMapGL = ({ hoveredCity, onCityHover, onCityClick }) => {
    const mapRef = useRef(null);

    // 1. Styl "Pusty" (Przezroczyste tło)
    const emptyMapStyle = useMemo(() => ({
        version: 8,
        name: "Blank",
        sources: {},
        layers: [
            {
                id: 'background',
                type: 'background',
                paint: { 'background-color': 'rgba(0,0,0,0)' }
            }
        ]
    }), []);

    // ----------------------------------------------------
    // STYLIZACJA WARSTW - EFEKT 3D
    // ----------------------------------------------------

    // A. WARSTWA CIENIA (Klucz do efektu 3D)
    // Rysujemy obrys jako czarną, rozmytą i przesuniętą plamę
    const shadowLayerStyle = {
        id: 'gzm-shadow',
        type: 'fill', // WAŻNE: Fill, nie Line
        paint: {
            'fill-color': '#000000',     // Czarny cień
            'fill-opacity': 0.4,         // Półprzezroczysty
            'fill-translate': [15, 20],  // Przesunięcie cienia (w dół i w prawo)
            'fill-blur': 2               // Lekkie rozmycie krawędzi
            // Uwaga: blur działa najlepiej, gdy polygon jest prosty. 
            // Jeśli cień jest "ostry", można zwiększyć translate.
        }
    };

    // B. Warstwa Wypełnienia Miast (Kolorowa mapa)
    const citiesFillLayerStyle = useMemo(() => {
        return {
            id: 'gzm-cities-fill',
            type: 'fill',
            paint: {
                'fill-color': [
                    'case',
                    ['==', ['get', 'name'], hoveredCity || ''],
                    '#B94E48', // Aktywny
                    '#f3f4f6'  // Nieaktywny (Bardzo jasny szary/biały dla kontrastu)
                ],
                'fill-opacity': 1, // Pełne krycie, żeby przykryć cień pod spodem
                'fill-outline-color': '#ffffff',
                'fill-color-transition': { duration: 300 }
            }
        };
    }, [hoveredCity]);

    // C. Warstwa Granic Miast (Białe linie)
    const citiesBorderLayerStyle = {
        id: 'gzm-cities-borders',
        type: 'line',
        paint: {
            'line-color': '#ffffff',
            'line-width': 1.5,
            'line-opacity': 0.8
        }
    };

    return (
        <div className="map-gl-wrapper">
            <Map
                ref={mapRef}
                mapLib={maplibregl}
                initialViewState={{
                    longitude: 19.02,
                    latitude: 50.30,
                    zoom: 8.5,
                    pitch: 55, // Nachylenie dla efektu 3D!
                    bearing: 0
                }}
                style={{ width: '100%', height: '100%' }}
                mapStyle={emptyMapStyle}
                scrollZoom={false}
                dragPan={true}
                doubleClickZoom={false}
                onLoad={(e) => e.target.resize()}
            >
                {/* 1. ŹRÓDŁO OBRYSU (CIEŃ POD SPODEM) */}
                <Source id="source-outline" type="geojson" data={silesiaOutlineData}>
                    <Layer {...shadowLayerStyle} />
                </Source>

                {/* 2. ŹRÓDŁO MIAST (MAPA WŁAŚCIWA NA WIERZCHU) */}
                <Source id="source-cities" type="geojson" data={silesiaCitiesData}>
                    <Layer {...citiesFillLayerStyle} />
                    <Layer {...citiesBorderLayerStyle} />
                </Source>

                {/* 3. MARKERY */}
                {citiesData.map((city, index) => {
                    const isActive = hoveredCity === city.name;
                    return (
                        <Marker
                            key={index}
                            longitude={city.lng}
                            latitude={city.lat}
                            anchor="center"
                            onClick={(e) => {
                                e.originalEvent.stopPropagation();
                                onCityClick(city.slug);
                            }}
                        >
                            <div
                                className={`gl-marker ${isActive ? 'active' : ''}`}
                                onMouseEnter={() => onCityHover(city.name)}
                                onMouseLeave={() => onCityHover(null)}
                            >
                                <div className="dot"></div>
                                <div className="pulse-wave"></div>
                                {/* Tooltip tylko dla aktywnych, żeby nie zasłaniać mapy */}
                                {isActive && <div className="gl-tooltip">{city.name}</div>}
                            </div>
                        </Marker>
                    );
                })}
            </Map>
        </div>
    );
};

export default SilesiaMapGL;