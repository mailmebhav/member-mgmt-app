/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useCallback } from "react";
import {
  Grid,
  Box,
  Stack,
  Typography,
  Button
} from "@mui/material";
import { useTheme } from "@mui/material"
import AddFirm from "./form/AddFrim"
import EditFirm from "./form/EditFirm"
import FirmDataGrid from '../components/datagrid/FrimDataGrid'
const FirmContent = () => {
    const mytheme = useTheme()
    const [refreshPage, setRefreshPage] = React.useState<boolean>(false)
    const updateRefreshStatus = useCallback(() =>
    {
      console.log('called 1')
      setRefreshPage(!refreshPage)
    },[])
    return (
    <Box sx={{flexGrow: 1, height: '82vh' }}>
        <Grid container direction="row" justifyContent={'center'} >
        <Grid item xs={12} sx={{ m: 1, p: 1 }}>
                <Typography variant="h3" align="center" component="span" color={mytheme.palette.primary.main}>
                    Firms
                </Typography>
                <Typography variant="body1" align="center" component="span" marginLeft={2} color={'gray'}>
                    Add/Upate/View firms
                </Typography>
                <Stack direction="row" sx={{float: 'right'}}>
                <AddFirm refresh={updateRefreshStatus} />
                {/* <EditFirm />                     */}
                </Stack>
        </Grid>
        <Grid item xs={12} spacing={2} sx={{m:1, p:1, border: '0.2px solid lightgray', borderRadius: 2}}>
              <FirmDataGrid reload={refreshPage} />
        </Grid>
        </Grid>
    </Box>
  )
}

export default FirmContent