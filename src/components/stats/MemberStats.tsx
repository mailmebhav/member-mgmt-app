"use client";
import React, { useCallback } from "react";
import {
  Grid,
  Box,
  Stack,
  Typography,
} from "@mui/material"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useTheme } from "@mui/material"
const MemberStats = () => 
{
    let data = 
    [
    {
       "category": '<= 5 years',
       "maleCount": 49,
       "femaleCount": 41
    },
    {
       "category": '>5  & <= 15 Yrs',
       "maleCount": 74,
       "femaleCount": 81
    },
    
    {
       "category": '> 15 & <= 30 Yrs',
       "maleCount": 139,
       "femaleCount": 120
    },
    {
       "category": '> 31 & <= 47 Yrs',
       "maleCount": 162,
       "femaleCount": 151
    },
    {
       "category": '> 47 & <=60 Yrs',
       "maleCount": 79,
       "femaleCount": 76
    },
    {
       "category": ' > 60 Yrs',
       "maleCount": 50,
       "femaleCount": 53
    }
    ]
    
    let unifiedData = [
        {
            "category": 'BALAK',
            "count": 90,
            "percentage": "8%"
        },
        {
            "category": 'KISHOR',
            "count": 155,
            "percentage": "14%"
        },
        {
            "category": 'BALAK',
            "count": 572,
            "percentage": "53%"
        },
        {
            "category": 'VADIL',
            "count": 258,
            "percentage": "24%"
        }
    ]
    const mytheme = useTheme()
    const maleTotal = () => 
    {
        let male = 0
        data.map((row) =>
        {
            male = male + row.maleCount
        })
        return male
    }
    const femaleTotal = () => 
        {
            let female = 0
            data.map((row) =>
            {
                female = female + row.femaleCount
            })
            return female
        }
        const totalCount = () => 
            {
                let total = 0
                data.map((row) =>
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
          {data.map((row) => (
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
          {unifiedData.map((row) => (
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