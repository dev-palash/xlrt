import React, { useEffect, useRef, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { getDocuments } from '../../ApiConfig/documentApi/doumentApi';
import { addDocuments } from '../../redux/slices/documentApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
const Table = () => {
  let docData = useSelector((state) => state.documents);
  const dispatch = useDispatch();
  const columns = [
    { field: 'id', headerName: 'ID', width: 90, type: 'number' },
    {
      field: 'docName',
      headerName: 'Doc name',
      width: 150,
      editable: true,
    },
    {
      field: 'dmsCode',
      headerName: 'DMS code',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'owner',
      headerName: 'Owner',
      sortable: false,
      width: 160
    },
    {
      field: 'size',
      headerName: 'Size',
      sortable: false,
      width: 160
    },
    {
      field: 'extension',
      headerName: 'Extension',
      sortable: false,
      width: 160
    },
  ];

  const rows = [
    { id: 1, docName: 'test1.pdf', dmsCode: '098095sdfj', owner: 'tets1', size: '2mb', extension: 'pdf' },
    { id: 2, docName: 'test2.pdf', dmsCode: 'dskjfew8re4r23', owner: 'tets1', size: '2mb', extension: 'pdf' },
    { id: 3, docName: 'test3.pdf', dmsCode: '4353452fse', owner: 'tets1', size: '2mb', extension: 'pdf' },
    { id: 4, docName: 'test4.pdf', dmsCode: '43534543', owner: 'tets1', size: '2mb', extension: 'pdf' },
    { id: 5, docName: 'test5.pdf', dmsCode: '435346546tdfg4', owner: 'tets1', size: '2mb', extension: 'pdf' },
    { id: 6, docName: 'test6.pdf', dmsCode: '4543534654sdf', owner: 'tets1', size: '2mb', extension: 'pdf' },
    { id: 7, docName: 'test7.pdf', dmsCode: 'fgdf43534543', owner: 'tets1', size: '2mb', extension: 'pdf' },
    { id: 8, docName: 'test8.pdf', dmsCode: '4534645645', owner: 'tets1', size: '2mb', extension: 'pdf' },
    { id: 9, docName: 'test9.pdf', dmsCode: '5645765756', owner: 'tets1', size: '2mb', extension: 'pdf' },
  ];

  useEffect(() => {
    console.log('i fire once');
    let count = 0;
    getDocuments()
      .then((res) => {
        if (res.data) {
          dispatch(addDocuments(Object.values(res.data)));
          toast.success('documents fetched successfully', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      }
      )
      .catch(
        (err) => {
          toast.warn('error occures, using dummy data');
          dispatch(addDocuments(rows));
        }
      );
    if (docData?.length == 0) {
      if (count < 1) {
        ++count;
        dispatch(addDocuments(rows));
        toast.warning('could not fetch data from server, using dummy data');
      }
      console.log(docData);
    }
    if (docData?.length > 0) {
      console.log('doc1', docData)
      return;
    }

  }, []);
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={docData}
        columns={columns}
        sx={{ width: '50rem', margin: '0 auto' }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  )
}

export default Table
