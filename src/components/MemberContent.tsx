/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useCallback } from "react";
import {
  Grid,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material"
import AddMember from "./form/AddMember";
import MemberDatGrid from "./datagrid/MemberDatGrid";
const MemberContent = () => {
    const mytheme = useTheme()
    const [refreshPage, setRefreshPage] = React.useState<boolean>(false)
    const updateRefreshStatus = useCallback(() =>
    {
      setRefreshPage(!refreshPage)
    },[])
    return (
    <Box sx={{flexGrow: 1, height: '82vh' }}>
        <Grid container direction="row" justifyContent={'center'} >
        <Grid item xs={12} sx={{ m: 1, p: 1 }}>
                <Typography variant="h3" align="center" component="span" color={mytheme.palette.primary.main}>
                    Members
                </Typography>
                <Typography variant="body1" align="center" component="span" marginLeft={2} color={'gray'}>
                    Add/Upate/View members
                </Typography>
                <Stack direction="row" sx={{float: 'right'}}>
                <AddMember refresh={updateRefreshStatus} />
                </Stack>
        </Grid>
        <Grid item xs={12} spacing={2} sx={{m:1, p:1, border: '0.2px solid lightgray', borderRadius: 2}}>
              <MemberDatGrid reload={refreshPage} />
        </Grid>
        </Grid>
    </Box>
  )
}

export default MemberContent