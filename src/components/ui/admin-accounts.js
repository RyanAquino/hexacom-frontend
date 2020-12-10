import React from 'react';
import MUIDataTable from 'mui-datatables';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

function AdminAccounts() {
  const useStyle = makeStyles(() => ({
    dataTable: {
      marginTop: '3%',
    },
  }));

  const columns = [
    {
      name: 'id',
      label: 'ID',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'number',
      label: 'Contact Number',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'address',
      label: 'Address',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'status',
      label: 'Status',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: '-',
      label: '-',
      options: {
        filter: false,
        sort: false,
      },
    },
  ];
  const data = [
    {
      id: '1001',
      name: 'Jack Ibagbaga',
      number: '090909090909',
      address: 'Ijay Bangir',
      status: 'Active',
    },
  ];

  const options = {
    selectableRows: 'none',
    customToolbar: () => (
      <Button
        variant="contained"
        color="secondary"
        startIcon={<AddIcon />}
      >
        New
      </Button>
    ),
  };
  const classes = useStyle();
  return (
    <>
      <div className={classes.dataTable}>
        <MUIDataTable
          title="Account Management"
          data={data}
          columns={columns}
          options={options}
        />
      </div>
    </>
  );
}

export default AdminAccounts;
