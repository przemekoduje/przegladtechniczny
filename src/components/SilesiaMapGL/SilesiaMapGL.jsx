import React, { useMemo, useRef } from 'react';
import Map, { Source, Layer, Marker } from 'react-map-gl/maplibre';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { citiesData } from '../../helpers/citiesData';
import './SilesiaMapGL.scss';

// IMPORT PLIKÓW GEOJSON
import silesiaOutlineData from '../../assets/silesia1.json';
import silesiaCitiesData from '../../assets/silesia2.json';

const SilesiaMapGL = ({
    hoveredCity,
    onCityHover,
    onCityClick,
    initialViewState = null,
    interactive = false
}) => {
    const mapRef = useRef(null);

    // Styl "Pusty"
    const emptyMapStyle = useMemo(() => ({
        version: 8,
        name: "Blank",
        sources: {},
        layers: [
            {
                id: 'background',
                type: 'background',
                paint: { 'background-color': 'rgba(0,0,0,0)' } // Przezroczyste
            }
        ]
    }), []);

    // --- STYLIZACJA WARSTW (KOLORY I CIEŃ 3D) ---

    // A. Cień (Wzmocniony efekt 3D)
    const shadowLayerStyle = {
        id: 'gzm-shadow',
        type: 'fill',
        paint: {
            'fill-color': '#000000',      // Czarny
            'fill-opacity': 0.25,         // Zwiększona widoczność cienia (było 0.1)
            'fill-translate': [15, 15],   // Większe przesunięcie (było 8, 8) dla lepszego efektu głębi
        }
    };

    // B. Wypełnienie (Jasnoczerwone)
    const citiesFillLayerStyle = useMemo(() => {
        return {
            id: 'gzm-cities-fill',
            type: 'fill',
            paint: {
                'fill-color': [
                    'case',
                    ['==', ['get', 'name'], hoveredCity || ''],
                    '#ef4444', // AKTYWNY
                    '#fee2e2'  // NIEAKTYWNY
                ],
                'fill-opacity': 1,
                'fill-color-transition': { duration: 300 }
            }
        };
    }, [hoveredCity]);

    // C. Granice
    const citiesBorderLayerStyle = {
        id: 'gzm-cities-borders',
        type: 'line',
        paint: {
            'line-color': '#991b1b',
            'line-width': 1,
            'line-opacity': 0.1
        }
    };

    return (
        <div className="map-gl-wrapper">
            <Map
                ref={mapRef}
                mapLib={maplibregl}
                initialViewState={initialViewState || {
                    // CENTROWANIE - dobrane eksperymentalnie dla GZM
                    longitude: 19.00,
                    latitude: 50.28,

                    // ZOOM - Zmniejszony z 8.2 na 7.6, aby zmieścić Tarnowskie Góry (góra) i Tychy (dół)
                    zoom: 8.2,

                    pitch: 45,
                    bearing: 0
                }}
                style={{ width: '100%', height: '100%' }}
                mapStyle={emptyMapStyle}
                scrollZoom={false}       // Zablokuj scrollowanie
                dragPan={false}          // Zablokuj przesuwanie (mapa ma być statyczna w kadrze)
                doubleClickZoom={false}
                interactive={interactive}      // Wyłącza wszelkie interakcje z mapą (tylko markery działają)
                onLoad={(e) => e.target.resize()}
            >
                <Source id="source-outline" type="geojson" data={silesiaOutlineData}>
                    <Layer {...shadowLayerStyle} />
                </Source>

                <Source id="source-cities" type="geojson" data={silesiaCitiesData}>
                    <Layer {...citiesFillLayerStyle} />
                    <Layer {...citiesBorderLayerStyle} />
                </Source>

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
                            style={{ cursor: 'pointer' }} // Wymuszenie kursora rączki
                        >
                            <div
                                className={`gl-marker ${isActive ? 'active' : ''}`}
                                onMouseEnter={() => onCityHover(city.name)}
                                onMouseLeave={() => onCityHover(null)}
                            >
                                <div className="dot"></div>
                                <div className="pulse-wave"></div>
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