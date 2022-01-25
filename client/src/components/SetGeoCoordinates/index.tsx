import React from 'react';
import {MapContainer, TileLayer, Marker, Popup, useMapEvents} from 'react-leaflet';
import L from 'leaflet';

import image from '../common/assets/location.png';

interface IProps {
    lat: number,
    lon: number,
    setCoords: ([lat, lon]: [number, number]) => void
}

const SetGeoCoordinates = ({lat, lon, setCoords}: IProps) => {
    const marker = new L.Icon({
        iconUrl: image,
        iconSize: new L.Point(26, 32)
    });

    const MapComponent = () => {
        useMapEvents({
            click: (props) => setCoords([props.latlng.lat, props.latlng.lng])
        });

        return (
            <Marker position={[lat, lon]} icon={marker}>
                <Popup>
                    Coordinates: [{lat.toFixed(4)}, {lon.toFixed(4)}]
                </Popup>
            </Marker>);
    };

    return (
        <MapContainer
            style={{height: 450, width: '100%'}}
            center={[lat, lon]}
            minZoom={2}
            zoom={7}
        >
            <TileLayer
                maxZoom={17}
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapComponent/>
        </MapContainer>
    );
};

export default SetGeoCoordinates;
