/* eslint-disable react-hooks/exhaustive-deps */
import { AgGridReact } from '@ag-grid-community/react'; // React Data Grid Component
import "@ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "@ag-grid-community/styles/ag-theme-material.css"; // Optional Theme applied to the grid
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {   ColDef,
  GetRowIdParams,
  ModuleRegistry,
} from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { AxiosResponse } from "axios";
import { FirmData, ReloadDataProps } from '../types/GenericTypes.types'
import { httpGetRequest } from '@/utils/httputils';
import { firmsAPI } from '../data/URLs';
import Grid from '@mui/material/Grid'
import { headers } from '@/utils/header';
import useLocalStorage from "@/hooks/useLocalStorage"
import { useRouter } from 'next/navigation'
import FirmEditButtonRenderer from './renderer/FirmEditRenderer'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import IconButton from '@mui/material/IconButton'
import { Checkbox } from '@mui/material';
import Edit from '@mui/icons-material/Edit';
import RefreshIcon from '@mui/icons-material/Refresh'

ModuleRegistry.registerModules([ ClientSideRowModelModule ]);

const firmColDefWithEdit = [
  { field: "firmName", flex: 1,
  },
  { field: "area", flex: 1,
  },
  { field: "pincode", flex: 1,
  },
  { field: "update", cellRenderer: FirmEditButtonRenderer , filter: false, floatingFilter: false , width: 100 }
]
const firmColDefWithoutEdit = [
  { field: "firmName", flex: 1,
  },
  { field: "area", flex: 1,
  },
  { field: "pincode", flex: 1,
  }
]

  const FirmDataGrid = (props: ReloadDataProps) => {
    const gridRef = useRef(null)
    const [refresh, setRefresh] = useState(false)
    const router = useRouter()
    const [rowData, setRowData] = useState<FirmData[]>([])
    const [value, ] = useLocalStorage("token")
    const [checked, setChecked] = useState(false) 
    const [colDefs, setColDefs] = useState<ColDef[]>(firmColDefWithoutEdit)
    const fetchAPIRequest = useCallback(() => 
    {     
      httpGetRequest(firmsAPI,{...headers, "Authorization": value})
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
        console.log(error)

        if (error.response.status === 401)
          {
              router.push('/login')
          }
          setRowData([])
      })
    },[])
    
    const handleEditDialog = (event: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked)
      setColDefs(event.target.checked? firmColDefWithEdit: firmColDefWithoutEdit)
    }
    const refreshMe = () => 
     {
      fetchFirmsApi()  
     }
     const fetchFirmsApi = useCallback(()=> {
      fetchAPIRequest()
     },[])
    useEffect(()=>
    { 
      if(refresh !== props.reload)
        {
          setRefresh(props.reload)
          fetchFirmsApi()
        }
    },[props.reload])
    
    const defaultColDef: ColDef<any, any> = {
        filter: true,
        floatingFilter: true,
      }
      const getRowId = useCallback((params: GetRowIdParams) => params.data.firmId, []);

      return (
        <>   
        <Grid container width="100%">
          <Grid item xs={12}>
            <Checkbox checked={checked} onChange={handleEditDialog} sx={{ color: 'gray', float: 'right' }} size={'small'} icon={<EditOutlinedIcon />} checkedIcon={<Edit />} />
            <IconButton onClick={refreshMe} sx={{ color: 'gray', float: 'right' }}><RefreshIcon /></IconButton>
          </Grid>
          <Grid item xs={12}>
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
      </Grid>
      </Grid>
      </>
       )
   }

export default React.memo(FirmDataGrid) 


