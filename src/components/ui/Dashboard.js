import React, { Component } from 'react';
import MUIDataTable from 'mui-datatables';
import Header from './header';
import axios from 'axios';

class Dashboard extends Component {
  styles = () => ({
    dataTable: {
      marginTop: '3%',
    },
  });

  componentDidMount() {
    const userToken = localStorage.getItem('token')
    const username = localStorage.getItem('username')
    console.log(username)
    if (userToken !== null){
      axios.get('user/'+username, {
        headers: {
          Authorization: 'JWT' + ' ' + userToken,
          'Content-type': 'Application/json',
        },
      })
        .then((response) => {
          // const res = response.data.user;
          console.log(response.status);
          if(response.status !== 200){
            localStorage.clear()
            document.location.href = '/'
          }

        })
        .catch((e) => {
          console.log(e);
          document.location.href = '/'
        })
      ;
    }
  }

  render() {
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
    return (
      <>
        <Header/>
        <div style={this.styles.dataTable}>
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

}

export default Dashboard;
