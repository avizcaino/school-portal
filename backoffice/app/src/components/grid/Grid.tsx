import {capitalize} from '@mui/material';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Selection,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import {ChevronDownIcon, PlusIcon, SearchIcon} from '@school-shared/components';
import {Entity} from '@school-shared/core';
import {Key, ReactNode, useCallback, useMemo, useState} from 'react';

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
  hideHeader?: boolean;
  withSearcher?: boolean;
  addItem?: (teacher: T | undefined, isNew?: boolean) => void;
}

export function Grid<T extends Entity>(props: GridModel<T>) {
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(props.columns?.filter(c => !c.hide)?.map(c => c.uid))
  );
  const [filterValue, setFilterValue] = useState('');

  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return props.columns;

    return props.columns?.filter(column => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const onSearchChange = useCallback((value?: string) => {
    setFilterValue(value || '');
  }, []);

  const onClear = useCallback(() => {
    setFilterValue('');
  }, []);

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
      <div className="flex justify-between gap-3 items-end">
        {props.withSearcher && (
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={onClear}
            onValueChange={onSearchChange}
          />
        )}
        <div className="flex gap-3">
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                Columns
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={visibleColumns}
              selectionMode="multiple"
              onSelectionChange={setVisibleColumns}
            >
              {props.columns?.map(column => (
                <DropdownItem key={column.uid} className="capitalize">
                  {capitalize(column.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Button
            color="primary"
            endContent={<PlusIcon />}
            onClick={() => props.addItem && props.addItem(undefined, true)}
          >
            Add New
          </Button>
        </div>
      </div>
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
