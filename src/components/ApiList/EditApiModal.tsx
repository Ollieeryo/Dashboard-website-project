import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { pencilIcon } from '../../utils/icons';

interface ApiParams {
  row: {
    id: number;
    description: string | null;
    username: string | null;
    password: string | null;
    key: string | null;
  };
}

interface EditApiModalProps {
  params: ApiParams;
}

export default function EditApiModal(props: EditApiModalProps) {
  const [open, setOpen] = useState(false);
  const { params } = props;

  const pencil = pencilIcon();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div
        className="hover:bg-slate-300 w-8 h-8 flex justify-center items-center rounded-2xl cursor-pointer"
        onClick={handleClickOpen}
      >
        {pencil}
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>編輯 API</DialogTitle>
        <DialogContent>
          <div className="flex">
            <TextField
              autoFocus
              margin="normal"
              id="id"
              label="Id"
              type="id"
              fullWidth
              variant="outlined"
              required
              defaultValue={params.row.id}
              sx={{ marginTop: '2rem' }}
            />
            <TextField
              autoFocus
              margin="normal"
              id="description"
              label="Description"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue={params.row.description}
              required
            />
            <TextField
              autoFocus
              margin="normal"
              id="username"
              label="Username"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue={params.row.username}
            />
            <TextField
              autoFocus
              margin="normal"
              id="password"
              label="Password"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue={params.row.password}
            />
            <TextField
              autoFocus
              margin="normal"
              id="key"
              label="Key"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue={params.row.key}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="error">
            取消
          </Button>
          <Button onClick={handleClose} variant="contained">
            儲存
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
