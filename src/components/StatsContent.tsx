"use client";
import React, { useCallback } from "react";
import {
  Grid,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material"
import GroupByNokhComponent from "./stats/GroupByNokhComponent"
import MemberStats from "./stats/MemberStats"

const StatsContent = () => 
{
    const mytheme = useTheme()
    return (
        <Grid container direction="row" justifyContent={'center'} alignItems={"center"} sx={{scrollbarWidth: 'none', background: '#FFF4EA'}}>
        <Grid item xs={12} sx={{ padding: 1 }}>
                <Typography variant="h4" align="center" component="div" color={mytheme.palette.primary.main} sx={{border: '2px solid gray', borderRadius: 3}}>
                    Samaj Stats
                </Typography>
                <Stack direction="row" width={'100%'}>
                        <GroupByNokhComponent />
                        <MemberStats />
                </Stack>
        </Grid>
        </Grid>
    )
}
export default StatsContent