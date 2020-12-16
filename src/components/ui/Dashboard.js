import React, { Component } from 'react';
import MUIDataTable from 'mui-datatables';
import Header from './header';
import axios from 'axios';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      jobsData : []
    }
  }
  styles = () => ({
    dataTable: {
      marginTop: '5%',
    },
  });

  componentDidMount() {
    const userToken = localStorage.getItem('token')
    const username = localStorage.getItem('username')
    console.log(username)
    console.log(userToken)
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
          }else {
            axios.get('job_orders', {
              headers: {
                Authorization: 'JWT' + ' ' + userToken,
                'Content-type': 'Application/json',
              },
            })
                .then((response) => {
                  let data = response.data.job_orders
                  console.log(data)
                  console.log(response.data.job_orders.length)
                  console.log(data[0].date_released)
                  for (let i =0; i < data.length; i++){
                    if (data[i].date_released === null){
                       data[i].status = "Ongoing";
                       data[i].date_released = "N/A";
                    }

                  }
                  this.setState({
                    jobsData : response.data.job_orders
                  })
                  console.log(this.state.jobsData)
                })
                .catch((e) => {
                  console.log(e)

                })
            ;
          }

        })
        .catch((e) => {
          console.log(e);
          localStorage.clear()
          document.location.href = '/'
        })
      ;
    }
  }



  render() {
    const columns = [
      {
        name: 'job_id',
        label: 'Job Order',
        options: {
          filter: true,
          sort: true,
          sortAscFirst: true,
        },
      },
      {
        name: 'technician_name',
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
        name: 'job_description',
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
        name: 'brand',
        label: 'Brand',
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

    const options = {
      selectableRows: 'none',
    };
    return (
      <>
        <Header/>
        <div style={this.styles.dataTable}>
          <MUIDataTable
            title=" Data Records "
            data={this.state.jobsData}
            columns={columns}
            options={options}
          />
        </div>
      </>
    );

  }

}

export default Dashboard;
