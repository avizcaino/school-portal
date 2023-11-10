import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import GroupAdd from '@mui/icons-material/GroupAdd';
import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRenderCellParams,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  GridToolbarContainer,
} from '@mui/x-data-grid';
import {Avatar, AvatarGroup, Button} from '@nextui-org/react';
import {useUpdateModal} from '@school-shared/components';
import {IGroup, ITeacherExtended} from '@school-shared/core';
import {useEffect, useState} from 'react';
import {deleteTeacher} from '../../application/delete-teacher/action';
import {fetchTeachers} from '../../application/get-teachers/action';
import {TeacherForm} from '../forms/TeacherForm';

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (newModel: (oldModel: GridRowModesModel) => GridRowModesModel) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const updateModal = useUpdateModal();
  const {setRows, setRowModesModel} = props;

  const addRecord = () => {
    updateModal({content: () => TeacherForm({onClose: onAddRecord}), renderCloseAction: true});
  };

  const onAddRecord = (data: ITeacherExtended) => {
    setRows(oldRows => [...oldRows, {...data, isNew: true}]);
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startContent={<AddIcon />} onClick={addRecord}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export function Teachers() {
  const updateModal = useUpdateModal();
  const [teachers, setTeachers] = useState<ITeacherExtended[]>([]);

  useEffect(() => {
    fetchTeachers().then(t => setTeachers(t));
  }, []);

  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.Edit}});
  };

  const handleEditGroupsClick = (id: GridRowId) => () => {
    const selectedTeacher = teachers.find(t => t.id === id);
    updateModal({
      content: () =>
        TeacherForm({
          onClose: processRowUpdate,
          data: selectedTeacher,
          groupAssignation: true,
        }),
      renderCloseAction: true,
    });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.View}});
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    deleteTeacher(id.toString());
    setTeachers(teachers.filter(row => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: {mode: GridRowModes.View, ignoreModifications: true},
    });

    const editedRow = teachers.find(row => row.id === id);
    if (editedRow!.isNew) {
      setTeachers(teachers.filter(row => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = {...newRow, isNew: false};
    setTeachers(teachers.map(row => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    // {
    //   field: 'profilePic',
    //   headerName: 'Avatar',
    //   renderCell: (params: GridRenderCellParams<any, string>) => (
    //     <img src={params.value} alt="profile-pic" />
    //   ),
    // },
    {field: 'name', headerName: 'Nom', editable: true},
    {field: 'firstSurname', headerName: 'Primer Cognom', editable: true},
    {field: 'secondSurname', headerName: 'Segon Cognom', editable: true},
    {field: 'internalId', headerName: 'DNI', editable: true},
    {
      field: 'groups',
      headerName: 'Cursos',
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <AvatarGroup isBordered max={2}>
          {params.row.groups?.map((g: IGroup) => (
            <Avatar name={g.name} />
          ))}
        </AvatarGroup>
      ),
      // valueGetter: (params: GridValueGetterParams<ITeacherExtended>) =>
      //   params.row.groups?.reduce((groups, g) => groups.concat(`${g.name} | `), ''),
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({id}) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<GroupAdd />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditGroupsClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      className="w-full px-4 py-4 flex flex-col"
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        className="shadow-lg"
        rows={teachers}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: {setRows: setTeachers, setRowModesModel},
        }}
      />
    </Box>
  );
}
