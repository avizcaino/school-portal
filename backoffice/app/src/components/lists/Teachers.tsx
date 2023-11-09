import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
  GridValueGetterParams,
} from '@mui/x-data-grid';
import {
  randomArrayItem,
  randomCreatedDate,
  randomId,
  randomTraderName,
} from '@mui/x-data-grid-generator';
import {ITeacherExtended} from '@school-server/server';
import {useEffect, useState} from 'react';
import {deleteTeacher} from '../../application/delete-teacher/action';
import {fetchTeachers} from '../../application/get-teachers/action';
import {updateTeacher} from '../../application/update-teacher/action';

const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
  return randomArrayItem(roles);
};

const initialRows: GridRowsProp = [
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
];

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (newModel: (oldModel: GridRowModesModel) => GridRowModesModel) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const {setRows, setRowModesModel} = props;

  const handleClick = () => {
    const id = randomId();
    setRows(oldRows => [...oldRows, {id, name: '', age: '', isNew: true}]);
    setRowModesModel(oldModel => ({
      ...oldModel,
      [id]: {mode: GridRowModes.Edit, fieldToFocus: 'name'},
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export function Teachers() {
  const [teachers, setTeachers] = useState<ITeacherExtended[]>([]);

  useEffect(() => {
    fetchTeachers().then(t => setTeachers(t));
  }, []);

  useEffect(() => {
    console.log(teachers);
  }, [teachers]);

  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.Edit}});
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
    updateTeacher(newRow.id, newRow);
    setTeachers(teachers.map(row => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    {
      field: 'profilePic',
      headerName: 'Avatar',
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <img src={params.value} alt="profile-pic" />
      ),
    },
    {field: 'name', headerName: 'Nom', editable: true},
    {field: 'firstSurname', headerName: 'Cognom', editable: true},
    {field: 'secondSurname', headerName: 'Cognom', editable: true},
    {
      field: 'groups',
      headerName: 'Cursos',
      valueGetter: (params: GridValueGetterParams<ITeacherExtended>) =>
        params.row.groups?.reduce((groups, g) => groups.concat(`${g.name} | `), ''),
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
