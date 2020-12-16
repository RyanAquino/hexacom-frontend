import React, {Component} from 'react';
import MUIDataTable from 'mui-datatables';
import Header from './header';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import theme from "./Theme";
import TextField from "@material-ui/core/TextField";
import Footer from "./footer";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';


class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jobsData: [],
            menuDropdown: "",
            brands: '',
            item: '',
            job_description: '',
            brand_id: '',
            job_id: '',
            isOpen: false,
            isOpen1: false,
            userType: 'user',
            options: [],

        }
    }


    itemHandler = (event) => {
        this.setState({
            item: event.target.value,
        });
    };
    descriptionHandler = (event) => {
        this.setState({
            job_description: event.target.value,
        });
    };

    brandHandler = (event) => {
        this.setState({
            brands: event.target.value,
        });
    };

    updateStatus = (data) => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].date_released === null) {
                data[i].status = "Ongoing";
                data[i].date_released = "N/A";
            } else {
                data[i].status = "Done";
            }
            if(data[i].status !== "Done"){
                data[i].options = <div>
                    <Button variant="contained"  color="primary" onClick={() => this.releaseJob(data[i].job_id)}>
                        Release
                    </Button
                    >|<Button variant="contained"  color="secondary" onClick={() => this.delJob(data[i].job_id)}>
                    Delete
                </Button>
                </div>
            }

        }

        return data
    }

    updateBrand = (e) => {
        console.log(e)
    }

    componentDidMount() {
        const token = localStorage.getItem('token')
        if (token === null) {
            document.location.href = '/'
        }
        let data = []

        axios.get('job_orders', {headers: {'Content-type': 'Application/json', 'Authorization': 'Bearer ' + token}})
            .then(response => {
                data = response.data.job_orders
                this.updateStatus(data)
                this.setState({
                    jobsData: data
                })
            }).catch((e) => {
            localStorage.clear()
            document.location.href = '/'
        })

    }

    delJob = (id) => {
        console.log(id)
        let auth = localStorage.getItem('token')
        console.log(auth)
        axios.delete('job_order/' + id, {
            headers: {
                'Content-type': 'Application/json',
                'Authorization': 'Bearer ' + auth
            }
        })
            .then(res => {
                document.location.href = '/dashboard'
            })
    }

    releaseJob = (id) => {
        console.log(id)
        let auth = localStorage.getItem('token')
        console.log(auth)
        axios.post('release/' + id, {
            headers: {
                'Content-type': 'Application/json',
                'Authorization': 'Bearer ' + auth
            }
        })
            .then(res => {
                document.location.href = '/dashboard'
            })
    }



    newJob = () => {
        let auth = localStorage.getItem('token')
        let id = ''
        let data = {
            item: this.state.item,
            job_description: this.state.job_description,
            brand_name: this.state.brands
        }
        axios.get('job_order/generate_uid', {
            data,
            headers: {
                'Content-type': 'Application/json',
                'Authorization': 'Bearer ' + auth
            }
        })
            .then(response => {
                console.log(response.data.uuid)
                id = response.data.uuid
            })
            .then(() => {
                axios.post('job_order/' + id, data, {
                    headers: {
                        'Content-type': 'Application/json',
                        'Authorization': 'Bearer ' + auth
                    }
                })
                    .then(res => {
                        console.log(res)
                        document.location.href = '/dashboard'
                    })
            }).catch(e => {
            console.log(e)
            document.location.href = '/'
        })
    }

    getMuiTheme = () => createMuiTheme({
        overrides: {
            MUIDataTableBodyCell: {
                root: {
                    backgroundColor: "#FFF",
                    height: "2rem"
                }
            }
        }
    })


    render() {

        const handleOpen = () => {
            this.setState({
                isOpen: true
            })
        }

        const handleClose = () => {
            this.setState({
                isOpen: false
            })
        };

        return (
            <div style={{
                backgroundColor: theme.palette.background.paper
            }}>
                <Header/>
                <Modal
                    open={this.state.isOpen}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div style={{
                        margin: 'auto',
                        marginTop: '10rem',
                        width: 400,
                        backgroundColor: theme.palette.background.paper,
                        border: '2px solid #000',
                        boxShadow: theme.shadows[5],
                        padding: theme.spacing(2, 4, 3),
                    }}>
                        <form autoComplete="off">
                            <Grid container justify="center">
                                <Grid item>
                                    <Typography variant={"h6"}>
                                        Add Job
                                    </Typography>
                                </Grid>
                            </Grid>
                            <br/>
                            <Grid container justify="center">
                                <Grid item>
                                    <TextField required={true} style={{
                                        paddingTop: '2%'
                                    }} id="standard-basic" label="Item" fullWidth value={this.state.item}
                                               onChange={this.itemHandler.bind(this)}/>
                                    <TextField style={{
                                        paddingTop: '2%'
                                    }} id="standard-basic-2" label="Description" value={this.state.job_description}
                                               onChange={this.descriptionHandler.bind(this)} fullWidth/>
                                    {/*<TextareaAutosize aria-label="minimum height" value={this.state.job_description} rowsMin={6} placeholder="Minimum 3 rows" onChange={this.descriptionHandler.bind(this)} fullWidth/>*/}

                                    <TextField style={{
                                        paddingTop: '2%'
                                    }} id="standard-basic-3" label="Brand" value={this.state.brand}
                                               onChange={this.brandHandler.bind(this)} fullWidth/>


                                </Grid>
                            </Grid>
                            <Grid container justify="center">
                                <Grid style={{
                                    paddingTop: '2%'
                                }} item>
                                    <Button type="button" variant="contained" color="primary" onClick={this.newJob}>
                                        Add
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Modal>
                <Modal
                    open={this.state.isOpen1}
                    onClose={this.handleClose1}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div style={{
                        margin: 'auto',
                        marginTop: '10rem',
                        width: 400,
                        backgroundColor: theme.palette.background.paper,
                        border: '2px solid #000',
                        boxShadow: theme.shadows[5],
                        padding: theme.spacing(2, 4, 3),
                    }}>
                        <h3>asd</h3>
                    </div>
                </Modal>
                <div style={{
                    marginTop: '0.1%'
                }}>
                    <MuiThemeProvider theme={this.getMuiTheme}>
                        {
                            localStorage.getItem('status') === 'yes' ?
                                <MUIDataTable
                                    title=" Data Records "
                                    data={this.state.jobsData}
                                    columns={[
                                        {
                                            name: 'job_id',
                                            label: 'Job Order',
                                            options: {
                                                filter: true,
                                                sort: true,
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
                                                sortAscFirst: false,
                                            },
                                        },
                                        {
                                            name: 'options',
                                            label: 'Options',
                                            options: {
                                                filter: true,
                                                sort: false,
                                            },
                                        },
                                    ]}
                                    options={{
                                        responsive: 'standard',
                                        selectableRows: 'none',
                                        sortOrder: {
                                            name: 'status',
                                            direction: 'desc'
                                        }
                                    }}
                                /> :
                                <MUIDataTable
                                    title=" Data Records "
                                    data={this.state.jobsData}
                                    columns={[
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
                                        {
                                            name: 'options',
                                            label: 'Options',
                                            options: {
                                                filter: true,
                                                sort: false,
                                            },
                                        },
                                    ]}
                                    options={{
                                        responsive: 'standard',
                                        sortOrder: {
                                            name: 'status',
                                            direction: 'desc'
                                        },
                                        selectableRows: 'none',
                                        customToolbar: () => (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                startIcon={<AddIcon/>}
                                                onClick={handleOpen}
                                            >
                                                New Job
                                            </Button>
                                        ),
                                    }}
                                />

                        }

                    </MuiThemeProvider>
                </div>
                <Footer/>
            </div>
        );

    }

}

export default Dashboard;
