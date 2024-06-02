import { IconButton, Dialog, DialogContent, DialogActions, Button } from '@mui/material'
import React, { useState } from 'react'
import EditNoteIcon from '@mui/icons-material/EditNote'
import EditFirm from '../editor/EditFirm'
import { FirmData } from '@/components/types/FirmTypes.types';

const FirmEditButtonRenderer = (props: FirmData): any => {
    const [open, setOpen] = useState(false);
    const onClose = () => setOpen(false);
    const onSave = () => {
      onClose();
    }
    return (
      <>
        <IconButton onClick={() => setOpen(true)}><EditNoteIcon /></IconButton>
        <Dialog open={open} onClose={() => setOpen(false)}>
            <EditFirm firmValue={props.data} onClose={onClose}  />
        </Dialog>
      </>
    );
  }

export default FirmEditButtonRenderer