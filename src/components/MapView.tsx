import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Position, PositionId } from '../positions';
import { LatLngExpression, Point } from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import icon2x from 'leaflet/dist/images/marker-icon-2x.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';

const defaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const selectedIcon = L.icon({
  iconUrl: icon2x,
  shadowUrl: iconShadow,
  iconSize: [30, 48],
  iconAnchor: [15, 48],
});

export interface MapViewProps {
  markers: Position[];
  center: LatLngExpression;
  selected?: PositionId[];
  onMarkerSelected?: (id: PositionId, doSelect: boolean) => void;
}

export const MapView: React.FC<MapViewProps> = ({ markers, center, selected, onMarkerSelected }) => {

  return (
    <MapContainer center={center} zoom={12} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers.map(({ id, lat, lng, name }) => {
        const doSelect = selected && selected.length === 1 ? !selected?.includes(id) : true;
        return (
          <Marker
            key={`${id}`}
            position={[lat, lng]}
            eventHandlers={{
              click: () => {
                onMarkerSelected?.(id, doSelect);
              },
            }}
            icon={selected?.includes(id) ? selectedIcon : defaultIcon}
          >
            <Popup closeOnClick offset={new Point(0, -50)} >{name}</Popup>
          </Marker>
        )
      }
    )}
    </MapContainer>
  );
};
