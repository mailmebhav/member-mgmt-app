/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Typography,
} from "@mui/material"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useTheme } from "@mui/material"
import { aggregatedCountByDobApi } from "../data/URLs";
import { httpGetRequest } from '@/utils/httputils'
import { headers } from '@/utils/header'
import useLocalStorage from "@/hooks/useLocalStorage"
import { AxiosResponse } from "axios";
import { useRouter } from 'next/navigation'

const MemberStats = () => 
{
  const router = useRouter()

  const [value, ] = useLocalStorage("token")
  const [aggregatedAgeCountByGender, setAggregatedAgeCountByGender] = useState<any>([])
  const [consolidatedAgeData, setconsolidatedAgeData] = useState<any>([])

  const fetchNokhsByCounts = useCallback(() => 
    {     
      httpGetRequest(aggregatedCountByDobApi,{...headers, "Authorization": value})
        .then((response : AxiosResponse) =>  {
          if(response.status === 200)
          {
            setAggregatedAgeCountByGender(response.data.data.category_gender)
            setconsolidatedAgeData(response.data.data.consolidated)
          }          
          else
          {
            setAggregatedAgeCountByGender([])
            setconsolidatedAgeData([])
          }  
      })
      .catch(function (error: any) {
        console.log(error)

        if (error.response.status === 401)
          {
              router.push('/login')
          }
          setAggregatedAgeCountByGender([])
            setconsolidatedAgeData([])
      })
    },[])
  
useEffect(()=> 
{
  fetchNokhsByCounts()
},[])

    const mytheme = useTheme()
    const maleTotal = () => 
    {
        let male = 0
        aggregatedAgeCountByGender.map((row: any) =>
        {
            male = male + row.maleCount
        })
        return male
    }
    const femaleTotal = () => 
        {
            let female = 0
            aggregatedAgeCountByGender.map((row: any) =>
            {
                female = female + row.femaleCount
            })
            return female
        }
        const totalCount = () => 
            {
                let total = 0
                aggregatedAgeCountByGender.map((row: any) =>
                {
                    total = total + row.maleCount + row.femaleCount
                })
                return total
            }
    return (
        <Box sx={{flexGrow: 1 }}>
    <TableContainer >
    <Table sx={{ width: 400,ml: 10,mt: 5,border:'1px solid gray', borderRadius: 4  }} aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell align="right">Male</TableCell>
            <TableCell align="right">Female</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {aggregatedAgeCountByGender.map((row:any) => (
            <TableRow
              key={row.category}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.category}
              </TableCell>
              <TableCell align="right">{row.maleCount}</TableCell>
              <TableCell align="right">{row.femaleCount}</TableCell>
              <TableCell align="right">{row.femaleCount + row.maleCount}</TableCell>

            </TableRow>
          ))}
           <TableRow
              key={'Total'}
              sx={{fontWeight: 'bold', '&:last-child td, &:last-child th': { border: 0 } }}
            >
               <TableCell component="th" scope="row" sx={{fontWeight: 'bold'}}>
                {"Total"}
              </TableCell>
              <TableCell align="right" sx={{fontWeight: 'bold'}}> {maleTotal()}</TableCell>
              <TableCell align="right" sx={{fontWeight: 'bold'}}>{femaleTotal()}</TableCell>
              <TableCell align="right" sx={{fontWeight: 'bold'}}>{totalCount()}</TableCell>
             
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    <TableContainer>
      <Table sx={{ width: 400,ml: 10,mt: 8,border:'1px solid gray', borderRadius: 4 }} aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell align="right">Count</TableCell>
            <TableCell align="right">Percentage</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {consolidatedAgeData.map((row: any) => (
            <TableRow
              key={row.category}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.category}
              </TableCell>
              <TableCell align="right">{row.count}</TableCell>
              <TableCell align="right">{row.percentage}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </Box>
    )
}
export default MemberStats