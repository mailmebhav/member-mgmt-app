/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback } from 'react'
import EditNoteIcon from '@mui/icons-material/EditNote'
import { IconButton, Dialog } from "@mui/material"
import { MemberData } from '../../types/GenericTypes.types'
import MemberEditComponent from './editor/MemberEditComponent'
const MemberEditRenderer = (props: MemberData | any): any => {
    const [open, setOpen] = useState(false);
    const onClose = useCallback(() => {
      setOpen(false)
    },[]) 
    return (
      <>
        <IconButton onClick={() => setOpen(true)}><EditNoteIcon /></IconButton>
        <Dialog open={open} onClose={()=>onClose()}>
             { open && <MemberEditComponent onClose={onClose} data={props} /> }
        </Dialog>
      </>
    );
  }

export default MemberEditRenderer