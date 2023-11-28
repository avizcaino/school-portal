import {
  Selection,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import {renderContent} from '@school-shared/components';
import {Entity} from '@school-shared/core';
import React, {Key, ReactNode, useMemo, useState} from 'react';

export interface GridColumn {
  name: string;
  uid: string;
  hide?: boolean;
}

export interface GridModel<T> {
  isFetching: boolean;
  columns: GridColumn[];
  items: T[];
  renderCell: (item: T, columnKey: Key) => ReactNode;
  toolbar?: React.FC;
  hideHeader?: boolean;
  withSearcher?: boolean;
  addItem?: () => void;
}

export interface GridToolbar {
  visibleColumns: Selection;
  setVisibleColumns: React.Dispatch<React.SetStateAction<Selection>>;
  columns: GridColumn[];
  addItem?: () => void;
  filterValue?: string;
  setFilterValue?: React.Dispatch<React.SetStateAction<string>>;
  withSearcher?: boolean;
}

const renderToolbar = (Content: React.FC, data: GridToolbar) => renderContent(Content, data);

export function Grid<T extends Entity>(props: GridModel<T>) {
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(props.columns?.filter(c => !c.hide)?.map(c => c.uid))
  );
  const [filterValue, setFilterValue] = useState('');

  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return props.columns;

    return props.columns?.filter(column => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    let filteredItems = [...(props.items ?? [])];

    if (hasSearchFilter) {
      filteredItems = filteredItems.filter((item: T) => {
        let found = false;
        for (const prop in item) {
          if (
            typeof item[prop] === 'string' &&
            (item[prop] as string).toLowerCase().includes(filterValue.toLowerCase())
          ) {
            found = true;
            break;
          }
        }
        return found;
      });
    }

    return filteredItems;
  }, [props.items, filterValue]);

  return (
    <div className="flex flex-col gap-4 px-4 py-4">
      {props.toolbar &&
        renderToolbar(props.toolbar, {
          columns: props.columns,
          visibleColumns,
          setVisibleColumns,
          addItem: props.addItem,
          filterValue,
          setFilterValue,
          withSearcher: props.withSearcher,
        })}
      <Table
        hideHeader={props.hideHeader}
        aria-label="Example table with custom cells"
        classNames={{
          base: 'max-h-[520px] overflow-scroll',
          table: 'min-h-[60px]',
        }}
      >
        <TableHeader columns={headerColumns}>
          {column => (
            <TableColumn key={column.uid} align={column.uid === 'name' ? 'start' : 'center'}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          isLoading={props.isFetching}
          loadingContent={<Spinner label="Loading..." />}
          items={filteredItems}
        >
          {(item: T) => (
            <TableRow key={item.id as string}>
              {columnKey => <TableCell>{props.renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
