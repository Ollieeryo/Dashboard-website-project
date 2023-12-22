import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { GridRowId } from '@mui/x-data-grid';
import { useState } from 'react';

type Props = {
  buttonLabel: string;
  title: string;
  id: GridRowId[];
};

export default function DeleteModal({ buttonLabel, title, id }: Props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        disabled={id && id.length > 0 ? false : true}
        variant="contained"
        color="error"
        onClick={handleClickOpen}
      >
        {buttonLabel}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {/* Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.  */}
            ID List: {id && id.length > 0 && `${id.sort().join(', ')}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={handleClose}>
            取消
          </Button>
          <Button variant="outlined" onClick={handleClose} autoFocus>
            確認刪除
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
