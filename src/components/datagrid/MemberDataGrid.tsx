/* eslint-disable react-hooks/exhaustive-deps */
import { AgGridReact } from '@ag-grid-community/react'; // React Data Grid Component
import "@ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "@ag-grid-community/styles/ag-theme-material.css"; // Optional Theme applied to the grid
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {   ColDef,
  GetRowIdParams,
  ModuleRegistry,
  ValueGetterParams, } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { AxiosResponse } from "axios";
import { ReloadDataProps, MemberData } from '../types/GenericTypes.types'
import { httpGetRequest } from '@/utils/httputils'
import { membersAPI } from '../data/URLs'
import { headers } from '@/utils/header'
import useLocalStorage from "@/hooks/useLocalStorage"
import { useRouter } from 'next/navigation'
import MemberEditRenderer from './renderer/MemberEditRenderer'
import { Typography, Checkbox, IconButton } from '@mui/material';
import EditOutlined from '@mui/icons-material/EditOutlined'
import Edit from '@mui/icons-material/Edit'
import RefreshIcon from '@mui/icons-material/Refresh'
import { getAge } from '@/utils/dateutils'

ModuleRegistry.registerModules([ ClientSideRowModelModule ]);

function dateToAgeFormatter(params: ValueGetterParams){
  return getAge(params.data.dob) +" yrs"
}
function firmNameFormatter( params: ValueGetterParams){
  return params.data.firm.firmName
}
function genderGetter( params: ValueGetterParams){
  return params.data.gender === ( 'M' || 'm' ) ? 'Male' : 'Female'
}
const FieldsWithUpdate = [
  { field: "edit", cellRenderer: MemberEditRenderer,
    filter: false, floatingFilter: false,  },
  { field: "firmName", valueGetter: firmNameFormatter
     , minWidth: 250, width: 300
  },
  { field: "memberName" },
  { field: "fatherName" },
  { field: "nokh" },
  { headerName: "age", valueGetter: dateToAgeFormatter},
  { field: "gender" , valueGetter: genderGetter},
  { field: "bloodGroup" },
  { field: "contact" },
  { field: "contact2" },
  { field: "kutchNative" },
  { field: "ksmnId" },
  { field: "yskId" },
  { field: "familyId" },
]
const FieldWithoutUpdate = 
[
  // { field: "firm", valueGetter: (p: { firm: { firmName: string; area: string; }; }) => p.firm.firmName + ',' + p.firm.area  },
  { field: "firmName", valueGetter: firmNameFormatter,  minWidth: 250, width: 300  },
  { field: "memberName" },
  { field: "fatherName" },
  { field: "nokh" },
  { headerName: "age", valueGetter: dateToAgeFormatter},
  { field: "gender" , valueGetter: genderGetter},
  { field: "bloodGroup" },
  { field: "contact" },
  { field: "contact2" },
  { field: "kutchNative" },
  { field: "ksmnId" },
  { field: "yskId" },
  { field: "familyId" },

]


const MemberDataGrid = (props: ReloadDataProps) => {
  const gridRef = useRef(null)
  const router = useRouter()
  const [rowData, setRowData] = useState<MemberData[]>([]);
  const [checked, setchecked] = useState<boolean>(false)
  const [value, ] = useLocalStorage("token")
  const [refreshMe, setRefreshMe] = useState(false)
  const [colDefs,setColDefs] = useState<ColDef[]>(checked ? FieldsWithUpdate : FieldWithoutUpdate);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => 
  {
    setchecked(event.target.checked)
  }

  const fetchMembersData = useCallback(() => 
  {     
    httpGetRequest(membersAPI,{...headers, "Authorization": value})
      .then((response : AxiosResponse) =>  {
        if(response.status === 200)
        {
            setRowData(response.data.data)
        }
  
        else
        {
          setRowData([])
        }  
    })
    .catch(function (error: any) {
      if (error.response.status === 401)
        {
            router.push('/login')
        }
          setRowData([])
    })
  },[])

  const handleRefreshMe = () => {
    setRefreshMe(!refreshMe)
}
useEffect(()=>
{ 
   if(refreshMe !==props.reload)
   {
    setRefreshMe(props.reload)
    fetchMembersData()
   }
},[props.reload])

useEffect(()=>
{
  setColDefs(checked ? FieldsWithUpdate : FieldWithoutUpdate)
},[checked])

const defaultColDef: ColDef = {
  filter: true,
  floatingFilter: true,
}
const getRowId = useCallback((params: GetRowIdParams) => params.data.memberId,[]);



  return (
    <> 
    <Typography align="right" variant="body2">
    <IconButton onClick={()=>fetchMembersData()} sx={{ color: '#A9A9A9' }}><RefreshIcon /></IconButton>
    <Checkbox checked={checked} onChange={handleChange} sx={{ color: '#A9A9A9	' }} size={'small'} icon={<EditOutlined />} checkedIcon={<Edit />} />
    </Typography>
    <div className={"ag-theme-material"} style={{ width: '100%', height: 600, fontWeight: 500 }}>
        <AgGridReact<MemberData>
          ref={gridRef}
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={20}
          getRowId={getRowId}
          onGridReady={fetchMembersData}
        />
    </div>
</>  )
}

export default MemberDataGrid