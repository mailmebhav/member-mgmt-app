/* eslint-disable react-hooks/exhaustive-deps */
import { AgGridReact } from '@ag-grid-community/react'; // React Data Grid Component
import "@ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "@ag-grid-community/styles/ag-theme-material.css"; // Optional Theme applied to the grid
import React, { ReactElement, useCallback, useEffect, useRef, useState } from 'react'
import {   ColDef,
  ColGroupDef,
  GetRowIdFunc,
  GetRowIdParams,
  GridApi,
  GridOptions,
  ModuleRegistry,
  createGrid } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { AxiosResponse } from "axios";
import { FirmData, FirmDataProps } from '../types/FirmTypes.types';
import { httpGetRequest } from '@/utils/httputils';
import { firmsAPI } from '../data/URLs';
import { headers } from '@/utils/header';
import useLocalStorage from "@/hooks/useLocalStorage"
import { useRouter } from 'next/navigation'
import FirmEditButtonRenderer from './renderer/FirmEditButtonRenderer'
ModuleRegistry.registerModules([ ClientSideRowModelModule ]);

  const FirmDataGrid = (props: FirmDataProps) => {
    const gridRef = useRef(null)
    const router = useRouter()
    const [rowData, setRowData] = useState<FirmData[]>([]);
    const [value, ] = useLocalStorage("token")
    const [colDefs] = useState<ColDef[]>([
      { field: "firmName" },
      { field: "area" },
      { field: "pincode" },
      { field: "update", cellRenderer: FirmEditButtonRenderer , filter: false, floatingFilter: false }
    ]);
    
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
    
    useEffect(()=>
    { 
      fetchAPIRequest()
    },[props.reload])

    const defaultColDef: ColDef<any, any> = {
        flex: 1,
        filter: true,
        floatingFilter: true,
      }
      const getRowId = useCallback(
        (params: GetRowIdParams<FirmData>) => params.data.id,
        [],
      );    return (
        <div className={"ag-theme-material"} style={{ width: '100%', height: 600 }}>
        <AgGridReact<FirmData>
          ref={gridRef}
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={15}
          getRowId={getRowId}
          onGridReady={fetchAPIRequest}
          frameworkComponents={{FirmEditButtonRenderer,}}
        />
      </div>
       )
   }

export default FirmDataGrid 