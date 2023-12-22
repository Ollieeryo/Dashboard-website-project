import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import RoleSelect from './RoleSelect';
import { pencilIcon } from '../../utils/icons';

interface UserParams {
  row: {
    id: number;
    role: string;
    email: string;
    password: string;
  };
}

interface EditUserModalProps {
  params: UserParams;
}

export default function EditUserModal(props: EditUserModalProps) {
  const [open, setOpen] = useState(false);
  const { params } = props;
  const [role, setRole] = useState(params.row.role);

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
        <DialogTitle>編輯帳號</DialogTitle>
        <DialogContent>
          <div className="flex">
            <RoleSelect role={role} setRole={setRole} />

            <TextField
              autoFocus
              margin="normal"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
              required
              defaultValue={params.row.email}
              sx={{ marginTop: '2rem' }}
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
              required
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
