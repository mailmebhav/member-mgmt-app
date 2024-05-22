import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from "@mui/material"

export default function EditFirm() {
    const mytheme = useTheme()

    const [editfirmopen, setEditfirmopen] = React.useState(false)
    const handleClickEditFrimOpen = () => {
        setEditfirmopen(true);
      }
    
      const handleEditFrimClose = () => {
        setEditfirmopen(false);
      }
  return (
    <React.Fragment>
      <Button variant="contained" size="small" sx={{color: 'white', ml:2 ,background: `${mytheme.palette.primary.main}`}}
                    onClick={handleClickEditFrimOpen}
                    >
                        Edit Firm
                    </Button>
      <Dialog
        open={editfirmopen}
        onClose={handleEditFrimClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            console.log(email);
            handleEditFrimClose();
          },
        }}
      >
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditFrimClose}>Cancel</Button>
          <Button type="submit">Edit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}