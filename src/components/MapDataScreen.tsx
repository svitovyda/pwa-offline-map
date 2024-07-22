import React from 'react';
import { DataGridView } from './DataGridView';
import { MapView } from './MapView';
import { center, PositionId, positions } from '../positions';

const CONCATENATION_CHAR = ',';

export const MapDataScreen: React.FC = () => {
  // to improve performance, we will store an array of IDs concatenated into one string
  const [selected, setSelected] = React.useState<string>('');

  const onMarkerSelect = (id: PositionId, doSelect: boolean) => {
    doSelect ? setSelected(`${id}`) : setSelected('');
  }

  const onDataSelection = (ids: PositionId[]) => {
    setSelected(ids.sort().join(CONCATENATION_CHAR));
  }

  return(
    <div style = {{ display: 'flex', height: '100vh' }} >
      <div style={{ width: '400px' }}>
        <DataGridView positions={positions} selected={selected.split(CONCATENATION_CHAR)} onMarkersSelected={onDataSelection} />
      </div>
      <div style={{ flex: 1, backgroundColor: 'lightblue' }}>
        <MapView center={center} markers={positions} selected={selected.split(CONCATENATION_CHAR)} onMarkerSelected={onMarkerSelect} />
      </div>
    </div >
  )
}
