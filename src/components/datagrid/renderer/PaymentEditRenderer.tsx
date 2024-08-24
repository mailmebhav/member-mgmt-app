/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback } from 'react'
import EditNoteIcon from '@mui/icons-material/EditNote'
import {IconButton, Dialog } from "@mui/material"
import PaymentEditComponent from './editor/PaymentEditComponent'
export const PaymentEditRenderer = (props: any): any => {
  const [open, setOpen] = useState(false);
  const onClose = useCallback(() => {
    setOpen(false)
  },[]) 
    
    return(
        <>
        <IconButton onClick={() => setOpen(true)}><EditNoteIcon /></IconButton>
        <Dialog open={open} onClose={() => setOpen(false)}>
          { open && <PaymentEditComponent onClose={onClose} data={props} /> }
        </Dialog>        
      </>
    )
}
