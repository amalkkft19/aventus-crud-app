import {useEffect, useState, useRef} from 'react';
import Axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import Button from "@mui/material/Button";

const ListPage = () => {
  const PAGE_SIZE = 10;
  const [listData, setListData] = useState([]);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: PAGE_SIZE,
  });
  const mapPageToNextCursor = useRef({});
  const getList = ()=>{
    const apiUrl = `https://reqres.in/api/users?page=${paginationModel.page}&per_page=100`; 

    Axios
      .get(apiUrl)
      .then((response) => {
       console.log(response);
       setListData(response.data.data)
     
      })
      .catch((error) => {
       console.log(error);
      });
  }

  const onHandleUserField =(params)=>{
    console.log(params)
const patchUrl = `https://reqres.in/api/users/${params.id}`
   const reqData = {
    first_name:params.row.first_name,
    last_name: params.row.last_name,
    email: params.row.email
   }
    Axios.patch(patchUrl,reqData).then((res)=>{
      console.log(res);
    }).catch(error=>{
      console.log(error);
    })

  }
 useEffect(()=>{
  getList();
 },[paginationModel])

 const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'first_name',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'last_name',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 300,
    editable: true,
  },
  {
    field: 'avatar',
    headerName:"Edit",
    width:100,
    renderCell:(params)=>(
      <Button onClick={()=>onHandleUserField(params)}>Update</Button>
    )
  }
];

const handlePaginationModelChange = (newPaginationModel) => {
  if (
    newPaginationModel.page === 0 ||
    mapPageToNextCursor.current[newPaginationModel.page - 1]
  ) {
    setPaginationModel(newPaginationModel);
  }
};



  return (
    <div> <DataGrid
    rows={listData}
    columns={columns}
    pageSizeOptions={[PAGE_SIZE]}
    disableRowSelectionOnClick
    paginationMode="server"
    onPaginationModelChange={handlePaginationModelChange}
    paginationModel={paginationModel}
  /></div>
  )
}

export default ListPage