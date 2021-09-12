import React, { Component } from 'react';
import Cookie from "js-cookie";
import axios from "axios";
import "./style/profile.scss";

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            info:{
                id: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                firm: '',
                address: '',
                gender: 1,
                dateOfBirth: ''
            },
            images: [],
            authenticate: true
        }
    }

    async componentDidMount() {     
        let response1 = await fetch(process.env.REACT_APP_BACKEND_URL + "/users?username=" + Cookie.get('username') ,{
            headers: {
                'Authorization':'bearer '+ Cookie.get('token'),
            },
        });
        let response2 = await fetch(process.env.REACT_APP_BACKEND_URL + "/customer-infos?customerId=" + Cookie.get('id') ,{
            headers: {
                'Authorization':'bearer '+ Cookie.get('token'),
            },
        });
        if (!response1.ok && !response2.ok) {
            console.log('Cannot connect to sever!');
            return
        }
        let data1 = await response1.json();
        let data2 = await response2.json();
        this.setState({loading: false,authenticate: true, user: data1[0]});
        if(data2.length !== 0){
            this.setState({info: data2[0]});
        }
        if(!this.state.user.avatar){
            this.setState({displayAddAvatar: 'block',displayChangeAvatar:'none',imgURL: '/uploads/avatar-default.jpg'});
        }
        else{
            this.setState({displayAddAvatar: 'none',displayChangeAvatar:'block',imgURL: this.state.user.avatar.url});
        }
    }

    onSubmitAddAvatar = async e => {
        e.preventDefault();
    
        const formData = new FormData();
    
        Array.from(this.state.images).forEach(image => {
          formData.append('files', image);
        });

        formData.append('ref','user');
        formData.append('refId',this.state.user.id);
        formData.append('field','avatar');
        formData.append('source', 'users-permissions');
    
        await axios
          .post(`http://localhost:1337/upload`, formData, {
            headers: { 'Content-Type': 'multipart/form-data','Authorization':'bearer '+ Cookie.get('token') },
          })
          .then(res => {
            console.log(res);
            alert('Thêm avatar thành công!')
          })
          .catch(err => {
            console.log(err.response);
            alert('Thêm avatar thất bại!')
        });
        window.location.href='/profile';
    };

    onSubmitChangeAvatar = async e => {
        e.preventDefault();
    
        const formData = new FormData();
    
        Array.from(this.state.images).forEach(image => {
          formData.append('files', image);
        });

        formData.append('ref','user');
        formData.append('refId',this.state.user.id);
        formData.append('field','avatar');
        formData.append('source', 'users-permissions');
    
        await axios
          .delete(`http://localhost:1337/upload/files/`+this.state.user.avatar.id , {
            headers: { 'Content-Type': 'multipart/form-data','Authorization':'bearer '+ Cookie.get('token') },
          })
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err.response);
        });

        await axios
            .post(`http://localhost:1337/upload`, formData, {
            headers: { 'Content-Type': 'multipart/form-data','Authorization':'bearer '+ Cookie.get('token') },
            })
            .then(res => {
            console.log(res);
            })
            .catch(err => {
            console.log(err.response);
        });
        window.location.href='/profile'
    };

    handleSubmit = (event) =>{
        event.preventDefault();
        if(this.state.info.id){
            axios
                .put(process.env.REACT_APP_BACKEND_URL + '/customer-infos/' + this.state.info.id, {
                    firstName: this.state.info.firstName,
                    lastName: this.state.info.lastName,
                    phoneNumber: this.state.info.phoneNumber,
                    address: this.state.info.address,
                    gender: this.state.info.gender,
                    firm: this.state.info.firm,
                    dateOfBirth: this.state.info.dateOfBirth,
                    customerId: this.state.user.id
                },{
                    headers: {
                    'Authorization':'bearer '+ Cookie.get('token')
                    }
                })
                .then(response => {
                    alert('update profile success.');
                    this.props.history.push("/profile");
                })
                .catch(error => {
                    alert('Update failed !!!');
                    console.log('An error occurred:', error.response);
                });
        }
        else{
            axios
                .post(process.env.REACT_APP_BACKEND_URL + '/customer-infos/' , {
                    firstName: this.state.info.firstName,
                    lastName: this.state.info.lastName,
                    phoneNumber: this.state.info.phoneNumber,
                    address: this.state.info.address,
                    gender: this.state.info.gender,
                    firm: this.state.info.firm,
                    dateOfBirth: this.state.info.dateOfBirth,
                    customerId: this.state.user.id
                },{
                    headers: {
                    'Authorization':'bearer '+ Cookie.get('token')
                    }
                })
                .then(response => {
                    alert('update profile success.');
                    this.props.history.push("/profile");
                })
                .catch(error => {
                    alert('Update failed !!!');
                    console.log('An error occurred:', error.response);
                });
        }
        return;
    }

    clickBack(){
        this.props.history.push("/");
    }

    render() {
        if (!this.state.loading && Cookie.get('token')) {
        return (
            <div className="container profile">
                <div className="panel-body inf-content">
                    <div className="title"> ACCOUNT INFOMATION :</div>

                    <div className="container body-info">
                    <div className="row">
                        <div className="col-sm-12 col-md-2 col-lg-2">
                            <div className="avatar-container">
                                <div style={{display: this.state.displayChangeAvatar}}>
                                    <img src={process.env.REACT_APP_BACKEND_URL + this.state.imgURL} title="Hoang" alt="avatar"/>
                                    <form onSubmit={this.onSubmitChangeAvatar} >
                                        <input id="img_input" type="file" name="files" onChange={e=>this.setState({images:e.target.files})}/>
                                        <button type="submit">Change</button>
                                    </form>
                                </div>

                                <div style={{display: this.state.displayAddAvatar}}>
                                    <img src={process.env.REACT_APP_BACKEND_URL + this.state.imgURL} title="Hoang" alt="avatar"/>
                                    <form onSubmit={this.onSubmitAddAvatar} >
                                        <input id="img_input" type="file" name="files" onChange={e=>this.setState({images:e.target.files})}/>
                                        <button type="submit">Add</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-12 col-md-10 col-lg-10">
                        <form onSubmit={this.handleSubmit} className="info-form">

                            <div className="row">
                                <label htmlFor='email' className='col-3 col-form-label'>Email :</label>
                                <div className="col-sm-9 col-md-7 col-lg-7">
                                    <input name="email" className="form-control" disabled type="email" value={this.state.user.email}/>
                                </div>
                            </div>

                            <div className="row">
                                <label htmlFor='phoneNumber' className='col-3 col-form-label'>Phone Number :</label>
                                <div className="col-sm-9 col-md-7 col-lg-7">
                                    <input name="phoneNumber" type="text" className="form-control" value={this.state.info.phoneNumber}
                                    onChange={(e)=> this.setState({info: {...this.state.info, phoneNumber: e.target.value}})}/>
                                </div>
                            </div>

                            <div className="row">
                                <label htmlFor='firstName' className='col-3 col-form-label'>First Name :</label>
                                <div className="col-sm-9 col-md-7 col-lg-7">
                                    <input name="firstName" type="text" className="form-control" value={this.state.info.firstName}
                                    onChange={(e)=> this.setState({info: {...this.state.info, firstName: e.target.value}})}/>
                                </div>
                            </div>

                            <div className="row">
                                <label htmlFor='lastName' className='col-3 col-form-label'>Last Name :</label>
                                <div className="col-sm-9 col-md-7 col-lg-7">
                                    <input name="lastName" type="text" className="form-control" value={this.state.info.lastName}
                                    onChange={(e)=> this.setState({info: {...this.state.info, lastName: e.target.value}})}/>
                                </div>
                            </div>

                            <div className="row">
                                <label htmlFor='firm' className='col-3 col-form-label'>Firm :</label>
                                <div className="col-sm-9 col-md-7 col-lg-7">
                                    <input name="firm" type="text" className="form-control" value={this.state.info.firm}
                                    onChange={(e)=> this.setState({info: {...this.state.info, firm: e.target.value}})}/>
                                </div>
                            </div>

                            <div className="row">
                                <label htmlFor='address' className='col-3 col-form-label'>Address :</label>
                                <div className="col-sm-9 col-md-7 col-lg-7">
                                    <input name="address" type="text" className="form-control" value={this.state.info.address}
                                    onChange={(e)=> this.setState({info: {...this.state.info, address: e.target.value}})}/>
                                </div>
                            </div>

                            <div className="row">
                                <label htmlFor='gender' className='col-3 col-form-label'>Gender :</label>
                                <div className="col-sm-9 col-md-7 col-lg-7">
                                    <div className="form-check form-check-inline">
                                        <input type="radio" name="gender" checked={this.state.info.gender} value="1"
                                        onChange={()=>this.setState({info:{...this.state.info,gender:1}})}/>
                                        <label className="form-check-label" >Male</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input type="radio" name="gender" checked={!this.state.info.gender} value="0"
                                        onChange={()=>this.setState({info:{...this.state.info,gender:0}})}/>
                                        <label className="form-check-label">Female</label>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <label htmlFor="DOB" className="col-3 col-form-label">Date Of Birth :</label>
                                <div className="col-sm-9 col-md-6 col-sm-2">
                                    <input name="DOB" value={this.state.info.dateOfBirth} type="date"
                                    onChange={(e)=> this.setState({info: {...this.state.info, dateOfBirth: e.target.value}})}/>
                                </div>
                            </div>

                            <div className="row">
                                <div className='col-3'>
                                    <button className="btn btn-primary" type="submit">Update</button>
                                </div>
                                <div className="col-sm-9 col-md-6 col-sm-2">
                                    <button className="btn btn-primary" type="type" onClick={this.clickBack}>Back</button>
                                </div>
                            </div>
                        </form>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
        }
        if(!this.state.authenticate){
            return <h2 className="ProductList-title">You need to login</h2>
        }
        return (<h2 className="ProductList-title">Waiting for API...</h2>);
    }
    }

export default Profile;