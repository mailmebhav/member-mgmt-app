/* eslint-disable react-hooks/exhaustive-deps */
import { AgGridReact } from '@ag-grid-community/react'; // React Data Grid Component
import "@ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "@ag-grid-community/styles/ag-theme-material.css"; // Optional Theme applied to the grid
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {   ColDef,
  GetRowIdParams,
  ModuleRegistry, } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { AxiosResponse } from "axios";
import { FirmData, FirmDataProps } from '../types/FirmTypes.types';
import { httpGetRequest } from '@/utils/httputils';
import { firmsAPI } from '../data/URLs';
import { headers } from '@/utils/header';
import useLocalStorage from "@/hooks/useLocalStorage"
import { useRouter } from 'next/navigation'
import FirmEditButtonRenderer from './renderer/FirmEditRenderer'
import { Typography, Checkbox, IconButton } from '@mui/material';
import EditOutlined from '@mui/icons-material/EditOutlined'
import Edit from '@mui/icons-material/Edit'
import RefreshIcon from '@mui/icons-material/Refresh'
ModuleRegistry.registerModules([ ClientSideRowModelModule ]);

const FieldsWithUpdate = [
  { field: "firmName" },
  { field: "area" },
  { field: "pincode" },
  { field: "edit", cellRenderer: FirmEditButtonRenderer,
    filter: false, floatingFilter: false,  }
]

const FieldWithoutUpdate = 
[
  { field: "firmName" },
  { field: "area" },
  { field: "pincode" },
]

const FirmDataGrid = (props: FirmDataProps) => {
  
    const gridRef = useRef(null)
    const router = useRouter()
    const [rowData, setRowData] = useState<FirmData[]>([]);
    const [checked, setchecked] = useState<boolean>(false)
    const [value, ] = useLocalStorage("token")
    const [refreshMe, setRefreshMe] = useState(false)
    const [colDefs,setColDefs] = useState<ColDef[]>(checked ? FieldsWithUpdate : FieldWithoutUpdate);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => 
    {
      setchecked(event.target.checked)
    }
    const fetchAPIRequest = useCallback(() => 
    {     
      httpGetRequest(firmsAPI,{...headers, "Authorization": value})
        .then((response : AxiosResponse) =>  {
          if(response.status === 200)
          {
              setRowData(response.data.data)
          }
          else if (response.status === 401)
          {
              router.push('/login')
          }
          else
          {
            setRowData([])
          }  
      })
      .catch(function (error: any) {
            setRowData([])
      })
    },[])
    
    const handleRefreshMe = () => {
        setRefreshMe(!refreshMe)
    }
    
    useEffect(()=>
    { 
      fetchAPIRequest()
    },[props.reload, refreshMe])

    useEffect(()=>
    {
      setColDefs(checked ? FieldsWithUpdate : FieldWithoutUpdate)
    },[checked])

    const defaultColDef: ColDef = {
        flex: 1,
        filter: true,
        floatingFilter: true,
      }
      const getRowId = useCallback((params: GetRowIdParams) => params.data.firmId,[]);

      return (
        <> 
          <Typography align="right" variant="body2">
          <IconButton onClick={handleRefreshMe}><RefreshIcon /></IconButton>
          <Checkbox checked={checked} onChange={handleChange} size={'small'} icon={<EditOutlined />} checkedIcon={<Edit />} />
          </Typography>
        <div className={"ag-theme-material"} style={{ width: '100%', height: 600 }}>
          <AgGridReact<FirmData>
            ref={gridRef}
            rowData={rowData}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            pagination={true}
            paginationPageSize={20}
            getRowId={getRowId}
            onGridReady={fetchAPIRequest}
          />
      </div>
      </>
       )
   }

export default FirmDataGrid 