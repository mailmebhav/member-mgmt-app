/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import * as React from "react"
import {
  Grid,
  Avatar,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Box,
  Stack,
  Divider
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import { useTheme } from "@mui/material"
import { useRouter } from "next/navigation"
import { countsApi } from '../components/data/URLs'
import { headers } from '@/utils/header'
import useLocalStorage from "@/hooks/useLocalStorage"
import { httpGetRequest } from '@/utils/httputils'
import { AxiosResponse } from "axios";
import { CountResponse } from "@/app/model/CountResponse";
import { useCallback, useEffect, useState } from "react";

const HomeContent = () => {
  const mytheme = useTheme()
  const router = useRouter()
  const [value, ] = useLocalStorage("token")
  const [counts, setCounts] = useState<CountResponse | any>(null)
  
  const fetchCounts = useCallback(() => 
    {     
      httpGetRequest(countsApi,{...headers, "Authorization": value})
        .then((response : AxiosResponse) =>  {
          if(response.status === 200)
          {
            setCounts(response.data.data)
          }
          else
          {
            setCounts(null)
          }  
      })
      .catch(function (error: any) {
        if (error.response.status === 401)
          {
              router.push('/login')
          }
          setCounts(null)
      })
    },[])
  useEffect(()=>
  {
    fetchCounts()
  },[])
  return (
    <Grid container direction="row" justifyContent={"center"} padding={0} margin={0} height={'95%'} sx={{background: "gray", overflowY: "hidden" }}>
      <Grid item xs={12} sm={12} sx={{background:"#F5B041", margin: 0, padding: '3%'}}>
          <Typography variant="h4" align="center" color="white" marginBottom={2} sx={{fontWeight: 500}}>
           Kutch Kadava Patidar Samaj Yelahanka 
          </Typography>
          <Grid sx={{flexGrow: 1, height: 'auto'}} container direction="row" justifyContent={"center"} alignItems="center" spacing={1} overflow={'auto'} paddingBottom={0}>
            <Grid key={'firm-key'} item>
              <Card 
              sx={{alignItems: 'center',
                  minWidth: 100,
                  width: 250,
                  borderRadius: 5,
              }}>
                <CardActionArea
                onClick={() => {
                    router.push('/firms')
                }}  
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  pt: 2,
                  color:'white',
                  background: `${mytheme.palette.primary.main}`,
                  border: "1px solid transparent",
                  "&:hover":{
                      color: `${mytheme.palette.primary.main}`,
                      background: 'white',
                      borderColor: `${mytheme.palette.primary.main}`,
                  }
                }}>
                  <Avatar
                  sx={{
                    width: 50,
                    height: 50,
                    background: 'lightgray',
                    color: `${mytheme.palette.primary.main}`,
                  }}>
                    <CorporateFareIcon />
                  </Avatar>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h4"
                      component="div"
                      align="center">
                        Firm
                      </Typography>
                      <Typography variant="body2">
                        Allows to add/edit/view firms
                      </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              </Grid>
              <Grid key={'member-key'} item>
              <Card 
              sx={{alignItems: 'center',
                  minWidth: 100,
                  width: 250,
                  borderRadius: 5,
              }}>
                <CardActionArea
                onClick={() => {
                    router.push('/members')
                }}  
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  pt: 2,
                  color:'white',
                  background: `${mytheme.palette.primary.main}`,
                  border: "1px solid transparent",
                  "&:hover":{
                      color: `${mytheme.palette.primary.main}`,
                      background: 'white',
                      borderColor: `${mytheme.palette.primary.main}`,
                  }
                }}>
                  <Avatar
                  sx={{
                    width: 50,
                    height: 50,
                    background: 'lightgray',
                    color: `${mytheme.palette.primary.main}`,
                  }}>
                    <GroupIcon />
                  </Avatar>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h4"
                      component="div"
                      align="center">
                        Member
                      </Typography>
                      <Typography variant="body2">
                        Allows to add/edit/view members
                      </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              </Grid>
              <Grid key={'payment-key'} item>
              <Card 
              sx={{alignItems: 'center',
                  minWidth: 100,
                  width: 250,
                  borderRadius: 5,
              }}>
                <CardActionArea
                onClick={() => {
                    router.push('/payments')
                }}  
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  pt: 2,
                  color:'white',
                  background: `${mytheme.palette.primary.main}`,
                  border: "1px solid transparent",
                  "&:hover":{
                      color: `${mytheme.palette.primary.main}`,
                      background: 'white',
                      borderColor: `${mytheme.palette.primary.main}`,
                  }
                }}>
                  <Avatar
                  sx={{
                    width: 50,
                    height: 50,
                    background: 'lightgray',
                    color: `${mytheme.palette.primary.main}`,
                  }}>
                    <CurrencyRupeeIcon />
                  </Avatar>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h4"
                      component="div"
                      align="center">
                        Payment
                      </Typography>
                      <Typography variant="body2">
                        Allows to add/edit/view payments
                      </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
      </Grid>
      <Grid item xs={12} sm={12}>
      <Box sx={{background:'gray', height: 'auto'}}>
        <Box sx={{m: 5, border: '2px solid orange', borderRadius: 2, align: "center"}}>
          <Typography color="white" variant="h6" align="center" p={2}>
            Current statistics
          </Typography>
          <Divider color="orange" />
          <Stack direction={'row'} justifyContent={'space-around'} display={'flex'} p={5} spacing={1}>
            <Stack>
              <Typography color="white" variant="h6" align="center" sx={{border: '0.5px solid orange', p: 1, borderRadius: 2}}>
                Members
                <Stack direction="row">
              <Typography color="white" variant="h6" align="center" sx={{border: '0.5px solid orange', p: 1, borderRadius: 2, marginRight: 1}}>
                    Male<span style={{borderLeft: '0.5px solid orange', marginLeft: 5, paddingLeft: 5, color:'orange', fontSize: 25, fontWeight: 'bold'}}>
                    {counts && counts.maleMemberCount ? counts.maleMemberCount: 'NA'}
                    </span>
                    </Typography>

              <Typography color="white" variant="h6" align="center" sx={{border: '0.5px solid orange', p: 1, borderRadius: 2, marginRight: 1}}>
                    Female<span style={{borderLeft: '0.5px solid orange', marginLeft: 5, paddingLeft: 5, color:'orange', fontSize: 25, fontWeight: 'bold'}}>
                    {counts && counts.femaleMemberCount ? counts.femaleMemberCount: 'NA'}
                    </span>
                    </Typography>

              <Typography color="white" variant="h6" align="center" sx={{border: '0.5px solid orange', p: 1, borderRadius: 2, marginRight: 2}}>
                    Total<span style={{borderLeft: '0.5px solid orange', marginLeft: 5, paddingLeft: 5, color:'orange', fontSize: 25, fontWeight: 'bold'}}>
                    {counts && counts.memberCount ? counts.memberCount: 'NA'}
                    </span>
                    </Typography>
                </Stack>
                </Typography> 
            </Stack>
            <Typography color="white" variant="h6" align="center" sx={{border: '0.5px solid orange', p: 1, borderRadius: 2}}>
                Firms
                <Stack direction="row">
              <Typography color="white" variant="h6" align="center" sx={{border: '0.5px solid orange', p: 1, borderRadius: 2, marginRight: 1}}>
                    Total<span style={{borderLeft: '0.5px solid orange', marginLeft: 5, paddingLeft: 5, color:'orange', fontSize: 25, fontWeight: 'bold'}}>
                      {counts && counts.firmCount ? counts.firmCount: 'NA'}
                    </span>
                    </Typography>
</Stack>
</Typography>
          </Stack>
        </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default HomeContent;
