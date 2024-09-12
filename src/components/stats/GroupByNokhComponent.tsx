/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Grid,
  Box,
  Stack,
  Typography,
  Paper
} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useTheme } from "@mui/material"
import { countsByNokhApi } from '../data/URLs';
import { httpGetRequest } from '@/utils/httputils'
import { headers } from '@/utils/header'
import useLocalStorage from "@/hooks/useLocalStorage"
import { AxiosResponse } from "axios";
import { useRouter } from 'next/navigation'

const GroupByNokhComponent = () => 
{

    const mytheme = useTheme()
    const router = useRouter()

      const [value, ] = useLocalStorage("token")
      const [nokhData, setNokhData] = useState<any>([])
      const fetchNokhsByCounts = useCallback(() => 
        {     
          httpGetRequest(countsByNokhApi,{...headers, "Authorization": value})
            .then((response : AxiosResponse) =>  {
              if(response.status === 200)
              {
                setNokhData(response.data.data)
              }          
              else
              {
                setNokhData(null)
              }  
          })
          .catch(function (error: any) {
            console.log(error)

            if (error.response.status === 401)
              {
                  router.push('/login')
              }
              setNokhData(null)
          })
        },[])

    useEffect(()=> 
    {
      fetchNokhsByCounts()
    },[])

    const summation = () => {
        let sum = 0
        nokhData && nokhData.map((row: any): any =>
        {
          sum+=row._count
        })
        return sum
    }
    return (
        <Box sx={{flexGrow: 1 }}>
             <TableContainer>
      <Table sx={{ m: 1, width: 400, ml: 10, backgroundColor: '#FADFA1' }} aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nokh</TableCell>
            <TableCell align="right">Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {nokhData && nokhData.map((row: any): any => (
            <TableRow
              key={row.nokh}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, p:0,m:0 }}
            >
              <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', fontSize: 14, color: '#C96868' }}>
                {row.nokh}
              </TableCell>
              <TableCell align="right"sx={{fontWeight: 'bold', fontSize: 17, color: '#C96868'}}>{row._count}</TableCell>
            </TableRow>
          ))}
           <TableRow
              key={'Total'}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{fontWeight: 'bold'}}>
                {'Total'}
              </TableCell>
              <TableCell align="right" sx={{fontWeight: 'bold'}}>{summation()}</TableCell>
             
            </TableRow>
        </TableBody>
      </Table>
      </TableContainer>
      </Box>
    )
}
export default GroupByNokhComponent