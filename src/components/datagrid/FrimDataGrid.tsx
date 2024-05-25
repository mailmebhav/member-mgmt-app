/* eslint-disable react-hooks/exhaustive-deps */
import { AgGridReact } from '@ag-grid-community/react'; // React Data Grid Component
import "@ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "@ag-grid-community/styles/ag-theme-material.css"; // Optional Theme applied to the grid
import React, { useCallback, useEffect, useState } from 'react'
import { ColDef, ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { AxiosResponse } from "axios";
import Button from '@mui/material/Button'
import { FirmData, FirmDataProps } from '../types/FirmTypes.types';
import { httpGetRequest } from '@/utils/httputils';
import { firmsAPI } from '../data/URLs';
import { headers } from '@/utils/header';
ModuleRegistry.registerModules([ ClientSideRowModelModule ]);


    const EditButton = () => 
    {
      return <Button onClick={()=> window.alert('clicked')}>edit</Button>
    }
  const FirmDataGrid = (props: FirmDataProps) => {
    const [rowData, setRowData] = useState<FirmData[]>([]);
    const [colDefs] = useState<ColDef<any, any>[]>([
      { field: "firmName" },
      { field: "area" },
      { field: "pincode" },
      { field: "button", cellRenderer: EditButton , filter: false, floatingFilter: false }
    ]);
    
    const fetchAPIRequest = useCallback(() => 
    {     
      httpGetRequest(firmsAPI,headers)
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
            setRowData([])
      })
    },[])
    
    useEffect(()=>
    { 
      fetchAPIRequest()
    },[props.reload])

    const defaultColDef: ColDef<any, any> = {
        flex: 1,
        filter: true,
        floatingFilter: true,
      }
    return (
        <div className={"ag-theme-material"} style={{ width: '100%', height: 600 }}>
        <AgGridReact<FirmData>
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={15}
          onGridReady={fetchAPIRequest}
        />
      </div>
       )
   }

export default FirmDataGrid 