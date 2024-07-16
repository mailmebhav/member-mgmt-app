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
import AddPayment from "./form/AddPayment"
import PaymentDetailDataGrid from "./datagrid/PaymentDetailDataGrid";
const PaymentContent = () => {
    const mytheme = useTheme()
    const [refreshPage, setRefreshPage] = React.useState<boolean>(false)
    const updateRefreshStatus = useCallback(() =>
    {
      setRefreshPage(!refreshPage)
    },[])
    return (
    <Box sx={{flexGrow: 1, height: '82vh' }}>
        <Grid container direction="row" justifyContent={'center'} >
        <Grid item xs={12} sx={{ m: 1, p: 1, borderRadius: 2, border: '1px solid gray', paddingLeft: 3 }}>
                <Typography variant="h3" align="center" component="span" color={mytheme.palette.primary.main}>
                    Payments
                </Typography>
                <Typography variant="body1" align="center" component="span" marginLeft={2} color={'gray'}>
                    Add/Upate/View payments
                </Typography>
                <Stack direction="row" sx={{float: 'right'}}>
                <AddPayment refresh={updateRefreshStatus} />
                </Stack>
        </Grid>
        <Grid item xs={12} spacing={2} sx={{m:1, p:1, border: '1px solid gray', borderRadius: 2}}>
              <PaymentDetailDataGrid reload={refreshPage} />
        </Grid>
        </Grid>
    </Box>
  )
}

export default PaymentContent