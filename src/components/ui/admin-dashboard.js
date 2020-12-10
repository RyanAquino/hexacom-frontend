import React from 'react';
import MUIDataTable from 'mui-datatables';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(() => ({
  dataTable: {
    marginTop: '3%',
  },
}));

function AdminDashboard() {
  const columns = [
    {
      name: 'job_order',
      label: 'Job Order',
      options: {
        filter: true,
        sort: true,
        sortAscFirst: true,
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
      name: 'item',
      label: 'Item',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'brand',
      label: 'Brand',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'description',
      label: 'Description',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'date_received',
      label: 'Date Received',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'date_released',
      label: 'Date Released',
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
  ];
  const data = [
    {
      job_order: 'J001',
      name: 'Jack Ibagbaga',
      item: 'Printer',
      brand: 'HP',
      description: 'Unable to read cartridge',
      date_received: '2020/12/4',
      date_released: 'N/A',
      status: 'Ongoing',
    },
  ];

  const options = {
    selectableRows: 'none',
  };
  const classes = useStyle();
  return (
    <>

      <div className={classes.dataTable}>
        <MUIDataTable
          title=" Data Records "
          data={data}
          columns={columns}
          options={options}
        />
      </div>
    </>
  );
}

export default AdminDashboard;