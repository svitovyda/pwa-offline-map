import { LatLngExpression } from "leaflet";

export interface Position {
  id: string;
  lat: number;
  lng: number;
  name: String;
}

export type PositionId = Position['id'];

export const positions: Position[] = [
  { id: "location1", lat: 52.5008, lng: 13.4393, name: "Location 1" },
  { id: "location2", lat: 52.5091, lng: 13.2897, name: "Location 2" },
  { id: "location3", lat: 52.5113, lng: 13.4268, name: "Location 3" },
  { id: "location4", lat: 52.4739, lng: 13.4252, name: "Location 4" },
  { id: "location5", lat: 52.5103, lng: 13.4444, name: "Location 5" },
  { id: "location6", lat: 52.5268, lng: 13.4411, name: "Location 6" },
  { id: "location7", lat: 52.5506, lng: 13.3635, name: "Location 7" },
  { id: "location8", lat: 52.5246, lng: 13.4019, name: "Location 8" },
];

const maxLat = Math.max(...positions.map((p) => p.lat));
const minLat = Math.min(...positions.map((p) => p.lat));
const maxLng = Math.max(...positions.map((p) => p.lng));
const minLng = Math.min(...positions.map((p) => p.lng));

export const center: LatLngExpression = [(maxLat + minLat) / 2, (maxLng + minLng) / 2];
