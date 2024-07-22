import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef, FirstDataRenderedEvent, IRowNode, SelectionChangedEvent } from 'ag-grid-community';
import { Position, PositionId } from '../positions';

const columnDefs: ColDef<Position>[] = [
  { headerName: 'Name', field: 'name' },
  { headerName: 'Latitude', field: 'lat' },
  { headerName: 'Longitude', field: 'lng' },
];

export interface DataGridViewProps {
  positions: Position[];
  selected?: PositionId[];
  onMarkersSelected?: (ids: PositionId[]) => void;
}

export const DataGridView: React.FC<DataGridViewProps> = ({ positions, selected, onMarkersSelected }) => {

  const onFirstDataRendered = React.useCallback((params: FirstDataRenderedEvent) => {
    if (selected) {
      const nodesToSelect: IRowNode<Position>[] = [];

      params.api.forEachNode((node: IRowNode<Position>) => {
        if (node.data && selected.includes(node.data.id)) {
          nodesToSelect.push(node);
        }
      });
      params.api.setNodesSelected({ nodes: nodesToSelect, newValue: true });
    }
  }, [selected]);

  const onSelectionChanged = (event: SelectionChangedEvent<Position>) => {
    const selectedData = event.api.getSelectedRows();
    onMarkersSelected?.(selectedData.map((p) => p.id));
  };

  return (
    <div className="ag-theme-alpine" style={{ width: "100%", height: "100%" }}>
      <AgGridReact
        key={selected?.join(',')}
        rowData={positions}
        columnDefs={columnDefs}
        rowSelection="multiple"
        onSelectionChanged={onSelectionChanged}
        onFirstDataRendered={onFirstDataRendered}
        defaultColDef={{
          flex: 1,
          filter: true,
        }}
      />
    </div>
  );
};
