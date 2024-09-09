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
import { ReloadDataProps, PaymentDetailsData } from '../types/GenericTypes.types'
import { httpGetRequest } from '@/utils/httputils';
import { paymentsAPI } from '../data/URLs';
import { headers } from '@/utils/header';
import useLocalStorage from "@/hooks/useLocalStorage"
import { useRouter } from 'next/navigation'

import { Typography, Checkbox, IconButton } from '@mui/material';
import EditOutlined from '@mui/icons-material/EditOutlined'
import Edit from '@mui/icons-material/Edit'
import RefreshIcon from '@mui/icons-material/Refresh'
import { PaymentEditRenderer } from './renderer/PaymentEditRenderer'
import "./styles.css"

ModuleRegistry.registerModules([ ClientSideRowModelModule ]);

function memberNameGetter( params: ValueGetterParams){
  return params.data.member.memberName + ", " +params.data.member.nokh
}

const paymentDetailColDefWithEdit = [
  { field: "memberName", flex: 2, valueGetter: memberNameGetter,
  },
  { field: "paymentMode", flex: 1,
  },
  { field: "paymentFor", flex: 1,
  },
  { field: "amount", flex: 1,
  },
  { field: "transactionId", flex: 1,
  },
  { field: "receiptNumber", flex: 1,
  },
  { field: "update", cellRenderer: PaymentEditRenderer , filter: false, floatingFilter: false , width: 100 }
]
const paymentDetailColDefWithoutEdit = [
  { field: "memberName", flex: 2, valueGetter: memberNameGetter,
  },
  { field: "paymentMode", flex: 1,
  },
  { field: "paymentFor", flex: 1,
  },
  { field: "amount", flex: 1,
  },
  { field: "transactionId", flex: 1,
  },
  { field: "receiptNumber", flex: 1,
  }
]
const PaymentDetailDataGrid = (props: ReloadDataProps) => {
  const gridRef = useRef(null)
  const router = useRouter()
  const [rowData, setRowData] = useState<PaymentDetailsData[]>([]);
  const [checked, setchecked] = useState<boolean>(false)
  const [value, ] = useLocalStorage("token")
  const [refreshMe, setRefreshMe] = useState(false)
  const [colDefs,setColDefs] = useState<ColDef[]>(paymentDetailColDefWithoutEdit);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => 
  {
    setchecked(event.target.checked)
  }

  const fetchPaymentDetailData = useCallback(() => 
  {     
    httpGetRequest(paymentsAPI,{...headers, "Authorization": value})
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
          if (error.response.status === 401)
            {
                router.push('/login')
            }
    })
  },[])
useEffect(()=>
{ 
   if(refreshMe !==props.reload)
   {
    setRefreshMe(props.reload)
    fetchPaymentDetailData()
   }
},[props.reload])

useEffect(()=>
{
  setColDefs(checked ? paymentDetailColDefWithEdit : paymentDetailColDefWithoutEdit)
},[checked])

const defaultColDef: ColDef = {
  filter: true,
  floatingFilter: true,
}
const getRowId = useCallback((params: GetRowIdParams) => params.data.paymentId,[]);

  return (
    <> 
    <Typography align="right" variant="body2">
    <IconButton onClick={() => fetchPaymentDetailData()} sx={{ color: 'gray' }}><RefreshIcon /></IconButton>
    <Checkbox checked={checked} onChange={handleChange} sx={{ color: 'gray' }} size={'small'} icon={<EditOutlined />} checkedIcon={<Edit />} />
    </Typography>
    <div className={"ag-theme-material"} style={{ width: '100%', height: 600 }}>
        <AgGridReact<PaymentDetailsData>
          ref={gridRef}
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={20}
          getRowId={getRowId}
          onGridReady={fetchPaymentDetailData}
          alwaysShowHorizontalScroll={true}
        />
    </div>
</>  )
}

export default PaymentDetailDataGrid
