import React, { useMemo, useRef, useId, useEffect } from 'react';
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
    const mapId = useId();

    // Styl "Pusty"
    const emptyMapStyle = useMemo(() => ({
        version: 8,
        name: "Blank",
        sources: {},
        layers: [
            {
                id: `background-${mapId}`,
                type: 'background',
                paint: { 'background-color': 'rgba(0,0,0,0)' } // Przezroczyste
            }
        ]
    }), [mapId]);

    // OBLICZANIE IDEALNEGO DOPASOWANIA MAPY (FIT BBOX)
    useEffect(() => {
        if (!mapRef.current) return;

        let resizeObserver;
        const map = mapRef.current.getMap();

        // Bounding box obejmujący DOKŁADNIE granice GZM (z pliku silesia2.json)
        // [MIN_LNG, MIN_LAT], [MAX_LNG, MAX_LAT]
        const bbox = [
            [18.3648765, 50.0170556], // Southwestern corner
            [19.4877330, 50.5310127]  // Northeastern corner
        ];

        const fitMap = () => {
            if (mapRef.current && map) {
                // Dynamically fit map using Mapbox native calculation
                map.fitBounds(bbox, {
                    padding: 15, // Płaski, równy margines 15px by mapa wypełniła okno do brzegu
                    duration: 0  // Natychmiastowe dociągnięcie
                });
            }
        };

        // Kiedy mapa zostanie poprawnie wczytana: dopasuj raz.
        map.on('load', fitMap);

        // Kiedy kontener HTML fizycznie zmienia wymiary - dopasuj precyzyjniej
        // To niezawodnie zapobiega problemom na różnych ekranach.
        const container = map.getContainer();
        if (container) {
            resizeObserver = new ResizeObserver(() => {
                fitMap();
            });
            resizeObserver.observe(container);
        }

        return () => {
            if (resizeObserver && container) resizeObserver.disconnect();
            map.off('load', fitMap);
        };
    }, []);

    // --- STYLIZACJA WARSTW (KOLORY I CIEŃ 3D) ---

    // A. Cień (Wzmocniony efekt 3D)
    const shadowLayerStyle = {
        id: `gzm-shadow-${mapId}`,
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
            id: `gzm-cities-fill-${mapId}`,
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
    }, [hoveredCity, mapId]);

    // C. Granice
    const citiesBorderLayerStyle = {
        id: `gzm-cities-borders-${mapId}`,
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
                id={`map-${mapId}`}
                ref={mapRef}
                mapLib={maplibregl}
                initialViewState={initialViewState || {
                    // CENTROWANIE - dobrane eksperymentalnie dla GZM
                    longitude: 19.00,
                    latitude: 50.25,

                    // ZOOM - Zwiększony, aby mapa lepiej wypełniała kontener i miała mniejsze marginesy
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
                <Source id={`source-outline-${mapId}`} type="geojson" data={silesiaOutlineData}>
                    <Layer {...shadowLayerStyle} />
                </Source>

                <Source id={`source-cities-${mapId}`} type="geojson" data={silesiaCitiesData}>
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