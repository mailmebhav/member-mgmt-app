import { AgGridReact } from '@ag-grid-community/react'; // React Data Grid Component
import "@ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "@ag-grid-community/styles/ag-theme-material.css"; // Optional Theme applied to the grid
import React, { useEffect, useState } from 'react'
import { ColDef, ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import axios, { AxiosResponse } from "axios";

ModuleRegistry.registerModules([ ClientSideRowModelModule ]);

interface FrimData {
    firmId: number,
    firmName: String,
    area: String,
    pincode: number
  }

const FirmDataGrid = () => {
    
    const [rowData, setRowData] = useState<FrimData[]>([]);
    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState<ColDef<FrimData>[]>([
      { field: "firmId" },
      { field: "firmName" },
      { field: "area" },
      { field: "pincode" }
    ]);
   
    
    useEffect(()=>{
        const requestPayloadWithHeader = {
            method: 'GET',
            url: 'http://localhost:3000/api/firm',
            headers: {
              "Content-Type": "application/json" 
             },
          }
         
          axios
              .request(requestPayloadWithHeader)
              .then((response : AxiosResponse) =>  {
            console.log(response)
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

    // Row Data: The data to be displayed.


    const defaultColDef: ColDef = {
        flex: 1,
      }
    return (
        // wrapping container with theme & size
        <div className={"ag-theme-material"} style={{ width: '100%', height: 400 }}>
        <AgGridReact<IRow>
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
        />
      </div>
       )
   }

export default FirmDataGrid