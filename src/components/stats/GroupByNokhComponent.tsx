"use client";
import React, { useCallback } from "react";
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
const GroupByNokhComponent = () => 
{
    let data = [
        {
          "nokh": "BATHANI",
          "count": 13
        },
        {
          "nokh": "BHAGAT",
          "count": 69
        },
        {
          "nokh": "BHANJIYANI",
          "count": 8
        },
        {
          "nokh": "BHAVANI",
          "count": 8
        },
        {
          "nokh": "CHHABHAIYA",
          "count": 71
        },
        {
          "nokh": "DADGA",
          "count": 4
        },
        {
          "nokh": "DAYANI",
          "count": 11
        },
        {
          "nokh": "DHANANI",
          "count": 37
        },
        {
          "nokh": "DHOLU",
          "count": 45
        },
        {
          "nokh": "DIWANI",
          "count": 79
        },
        {
          "nokh": "HALPANI",
          "count": 10
        },
        {
          "nokh": "JABUVANI",
          "count": 1
        },
        {
          "nokh": "KALARIYA",
          "count": 5
        },
        {
          "nokh": "KESHRANI",
          "count": 24
        },
        {
          "nokh": "KHETANI",
          "count": 19
        },
        {
          "nokh": "LIMBANI",
          "count": 99
        },
        {
          "nokh": "MAKANI",
          "count": 4
        },
        {
          "nokh": "MANANI",
          "count": 22
        },
        {
          "nokh": "MAVANI",
          "count": 4
        },
        {
          "nokh": "MEGHANI",
          "count": 22
        },
        {
          "nokh": "NAKRANI",
          "count": 78
        },
        {
          "nokh": "NARSINGANI",
          "count": 9
        },
        {
          "nokh": "NATHANI",
          "count": 46
        },
        {
          "nokh": "NAYANI",
          "count": 16
        },
        {
          "nokh": "PANCHANI",
          "count": 67
        },
        {
          "nokh": "POKAR",
          "count": 25
        },
        {
          "nokh": "POKAR(GANGANI)",
          "count": 4
        },
        {
          "nokh": "RAJANI",
          "count": 5
        },
        {
          "nokh": "RAMANI",
          "count": 41
        },
        {
          "nokh": "RUDANI",
          "count": 14
        },
        {
          "nokh": "SANKHALA",
          "count": 8
        },
        {
          "nokh": "SENGHANI",
          "count": 11
        },
        {
          "nokh": "SOMJIYANI",
          "count": 11
        },
        {
          "nokh": "SURANI",
          "count": 78
        },
        {
          "nokh": "TEJANI",
          "count": 21
        },
        {
          "nokh": "VALANI",
          "count": 14
        },
        {
          "nokh": "VELANI",
          "count": 32
        },
        {
          "nokh": "WADIYA",
          "count": 1
        }
      ]
    const mytheme = useTheme()
    const summation = () => {
        let sum = 0
        data.map((row) => 
        {
            sum+=row.count
        })
        return sum
    }
    return (
        <Box sx={{flexGrow: 1 }}>
             <TableContainer>
      <Table sx={{ m: 1, width: 400, ml: 10, border:'1px solid gray', borderRadius: 4 }} aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nokh</TableCell>
            <TableCell align="right">Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.nokh}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, p:0,m:0 }}
            >
              <TableCell component="th" scope="row" sx={{ fontSize: 11}}>
                {row.nokh}
              </TableCell>
              <TableCell align="right">{row.count}</TableCell>
             
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