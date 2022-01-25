import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import React from 'react';
import L from 'leaflet';

import image from '../common/assets/location.png'

interface IProps {
    lat: number;
    lon: number;
    name: string;
    height?: number | string;
}

const marker = new L.Icon({
    iconUrl: image,
    iconSize: new L.Point(26, 32)
});

const CardGeolocation = (props: IProps) => {
    const {lat, lon, name} = props;
    return (
        <MapContainer
            style={{height: props.height || 180, width: '100%'}}
            dragging={false}
            doubleClickZoom={false}
            zoomControl={false}
            center={[lat, lon]}
            zoom={15}
            scrollWheelZoom={false}
        >
            <TileLayer
                maxZoom={20}
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[lat, lon]} icon={marker}>
                <Popup position={[lat, lon]}>
                    {name}
                </Popup>
            </Marker>

        </MapContainer>
    );
};

export default CardGeolocation;
