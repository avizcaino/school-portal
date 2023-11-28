import {capitalize} from '@mui/material';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from '@nextui-org/react';
import {ChevronDownIcon, PlusIcon, SearchIcon} from '@school-shared/components';
import {useCallback} from 'react';
import {GridToolbar} from './Grid';

export const CommonToolbar = (props: GridToolbar) => {
  console.log(props);
  const onSearchChange = useCallback((value?: string) => {
    props.setFilterValue && props.setFilterValue(value || '');
  }, []);

  const onClear = useCallback(() => {
    props.setFilterValue && props.setFilterValue('');
  }, []);

  return (
    <div className="flex justify-between gap-3 items-end">
      {props.withSearcher && (
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by name..."
          startContent={<SearchIcon />}
          value={props.filterValue}
          onClear={onClear}
          onValueChange={onSearchChange}
        />
      )}
      <div className="flex gap-3">
        {/* <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                Status
              </Button>
            </DropdownTrigger>
            {<DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={statusFilter}
              selectionMode="multiple"
              onSelectionChange={setStatusFilter}
            >
              {statusOptions.map(status => (
                <DropdownItem key={status.uid} className="capitalize">
                  {capitalize(status.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>}
          </Dropdown> */}
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
            selectedKeys={props.visibleColumns}
            selectionMode="multiple"
            onSelectionChange={props.setVisibleColumns}
          >
            {props.columns?.map(column => (
              <DropdownItem key={column.uid} className="capitalize">
                {capitalize(column.name)}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Button color="primary" endContent={<PlusIcon />} onClick={props.addItem}>
          Add New
        </Button>
      </div>
    </div>
  );
};
