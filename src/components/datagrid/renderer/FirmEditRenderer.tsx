
import React, { useCallback, useState } from 'react'
import EditNoteIcon from '@mui/icons-material/EditNote'
import { IconButton, Dialog } from "@mui/material"
import { FirmData } from '../../types/GenericTypes.types'
import FirmEditComponent from './editor/FirmEditComponent'

const FirmEditRenderer = (props: any): any => {
    const [open, setOpen] = useState(false);
    const onClose = useCallback(() => {
      setOpen(false)

    },[]) 
  
    return (
      <>
        <IconButton onClick={() => setOpen(true)}><EditNoteIcon /></IconButton>
        <Dialog open={open} onClose={onClose}>
           { open && <FirmEditComponent onClose={onClose} data={props} /> }
        </Dialog>
      </>
    );
  }

export default FirmEditRenderer
