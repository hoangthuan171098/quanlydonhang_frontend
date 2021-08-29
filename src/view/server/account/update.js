import React, { Component } from 'react'
import Cookie from 'js-cookie'
import axios from 'axios'

class AccountUpdate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            authenticate: true,
            roleValue: "",
            user: {},
            info:{
                id: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                firm: '',
                address: '',
                gender: 1,
                dateOfBirth: '',
                avatar: {}
            }
        }
    }

    async componentDidMount() {
        if(Cookie.get('role') === 'Admin'){     
            let response1 = await fetch(process.env.REACT_APP_BACKEND_URL + "/users/" + this.props.match.params.id,{
                headers: {
                'Authorization':'bearer '+ Cookie.get('token'),
                },
            });
            let response2 = await fetch(process.env.REACT_APP_BACKEND_URL + "/customer-infos?customerId=" + this.props.match.params.id ,{
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
            this.setState({loading: false,authenticate: true, user: data1});
            if(data2.length !== 0){
                this.setState({info: data2[0]});
            }
            this.setState({roleValue: this.state.user.role.id});
            return;
        }
        this.setState({authenticate: false});
    }

    render() {
        const clickSubmit = (event) =>{
            event.preventDefault();
            axios
              .put(process.env.REACT_APP_BACKEND_URL + '/users/' + this.state.user.id, {
                email: this.state.user.email,
                username: this.state.user.username,
                role: this.state.roleValue,
                confirmed: this.state.user.confirmed
              },{
                headers: {
                  'Authorization':'bearer '+ Cookie.get('token'),
                },
              })
              .catch(error => {
                // Handle error.
                alert('Update failed !!!');
                console.log('An error occurred:', error.response);
              });
            
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
                    customerId: this.props.match.params.id
                },{
                    headers: {
                    'Authorization':'bearer '+ Cookie.get('token')
                    }
                })
                .then(response => {
                    alert('update account success.');
                    this.props.history.push('/admin/accounts')
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
                    customerId: this.props.match.params.id
                },{
                    headers: {
                    'Authorization':'bearer '+ Cookie.get('token')
                    }
                })
                .then(response => {
                    alert('Cập nhật thông tin thành công');
                    window.location.href = "/admin/accounts";
                })
                .catch(error => {
                    alert('Cập nhật thất bại !!!');
                    console.log('An error occurred:', error.response);
                });
            }
            
            return;
        }
      
      
        const clickBack = (event) => {
            event.preventDefault();
            this.props.history.push('/admin/accounts')
        }
      
        if (!this.state.loading && Cookie.get('token')) {
            return (
                <div className="container">
                    <h2>Account Update</h2>
                    <div className="row">
        
                    <div className="col-lg-10 container">
                        <form id="account-update-form" onSubmit={clickSubmit}>
                        <div className="messages"></div>
        
                        <div className="controls">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label htmlFor="form_username">Username :</label>
                                        <input id="form_username" type="text" name="username" className="form-control" value={this.state.user.username} required="required"
                                            data-error="Username is required." onChange={(e)=>this.setState({user:{...this.state.user,username:e.target.value}})} />
                                        <div className="help-block with-errors"></div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label htmlFor="form_email">Email :</label>
                                        <input id="form_email" type="email" name="email" className="form-control" value={this.state.user.email} required="required"
                                            data-error="Email is required." onChange={(e)=>this.setState({user:{...this.state.user,email:e.target.value}})}/>
                                        <div className="help-block with-errors"></div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="form-group">
                                        <label htmlFor="form_role">Role :</label>
                                        <select id="form_role" className="form-control" value={this.state.roleValue} onChange={(e)=>this.setState({roleValue:e.target.value})}>
                                            <option value="605037228879df0bf81ba879"> Khách hàng</option>
                                            <option value="6050394d8879df0bf81ba98e"> Admin</option>
                                        </select>
                                        <div className="help-block with-errors"></div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="form-group">
                                        <label htmlFor="form_confirmed">Xác nhận :</label>
                                        <select id="form_confirmed" className="form-control" value={this.state.user.confirmed} 
                                        onChange={(e)=>this.setState({user: {...this.state.user,confirmed: e.target.value}})}>
                                            <option value={true}> Rồi</option>
                                            <option value={false}> Chưa</option>
                                        </select>
                                        <div className="help-block with-errors"></div>
                                    </div>
                                </div>
                            </div>
        
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label htmlFor="phoneNumber">Số điện thoại :</label>
                                        <input name="phoneNumber" className="form-control" value={this.state.info.phoneNumber}
                                        onChange={(e)=> this.setState({info: {...this.state.info, phoneNumber: e.target.value}})}/>
                                        <div className="help-block with-errors"></div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label htmlFor="firm">Công ty:</label>
                                        <input name="firm" className="form-control" value={this.state.info.firm}
                                        onChange={(e)=> this.setState({info: {...this.state.info, firm: e.target.value}})}/>
                                        <div className="help-block with-errors"></div>
                                    </div>
                                </div>
                            </div>
        
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label htmlFor="lastName">Họ :</label>
                                        <input name="lastName" className="form-control" value={this.state.info.lastName}
                                        onChange={(e)=> this.setState({info: {...this.state.info, lastName: e.target.value}})}/>
                                        <div className="help-block with-errors"></div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label htmlFor="firstName">Tên :</label>
                                        <input name="firstName" className="form-control" value={this.state.info.firstName}
                                        onChange={(e)=> this.setState({info: {...this.state.info, firstName: e.target.value}})}/>
                                        <div className="help-block with-errors"></div>
                                    </div>
                                </div>
                            </div>
        
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label htmlFor="address">Địa chỉ :</label>
                                        <input name="address" className="form-control" value={this.state.info.address}
                                        onChange={(e)=> this.setState({info: {...this.state.info, address: e.target.value}})}/>
                                        <div className="help-block with-errors"></div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                    <label htmlFor='gender'>Giới tính :</label>
                                    <div>
                                        <div className="form-check form-check-inline">
                                            <input type="radio" name="gender" checked={this.state.info.gender} value="1"
                                            onChange={()=>this.setState({info:{...this.state.info,gender:1}})}/>
                                            <label className="form-check-label" >Nam</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input type="radio" name="gender" checked={!this.state.info.gender} value="0"
                                            onChange={()=>this.setState({info:{...this.state.info,gender:0}})}/>
                                            <label className="form-check-label">Nữ</label>
                                        </div>
                                    </div>
                                        <div className="help-block with-errors"></div>
                                    </div>
                                </div>
                            </div>
        
                            <div className="row">
                                <label htmlFor="DOB" className="col-3 col-form-label">Ngày sinh :</label>
                                <div className="col-sm-9 col-md-6 col-sm-2">
                                    <input name="DOB" value={this.state.info.dateOfBirth} type="date"
                                    onChange={(e)=> this.setState({info: {...this.state.info, dateOfBirth: e.target.value}})}/>
                                </div>
                            </div>
        
                            <div id="result" style={{color:"red"}}>
                            </div>
        
                            <input type="submit" className="btn btn-primary" style={{marginRight:20+"px"}} value="Cập nhật" />
                            <button className="btn btn-primary" onClick={e => clickBack(e)} > Trở về</button>
                        </div>
                        </form>
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

export default AccountUpdate;