import React, { Component } from 'react'
import Cookie from 'js-cookie'
import axios from 'axios'

class AccountCreate extends Component {
	constructor(props) {
		super(props)

		this.state = {
			loading: true,
			authenticate: true,
			user: {
				username: "",
				email: "",
				type: {name:'none'},
				password: "",
				confirmPassword: "",
			}
		}
	}


	async componentDidMount() {
		if(Cookie.get('role') === 'Admin'){     
			let response = await fetch(process.env.REACT_APP_BACKEND_URL + "/product-categories",{
				headers: {
					'Authorization':'bearer '+ Cookie.get('token'),
				},
			})
			let response2 = await fetch(process.env.REACT_APP_BACKEND_URL + "/product-categories",{
				headers: {
					'Authorization':'bearer '+ Cookie.get('token'),
				},
			})
			if (!response.ok || !response2.ok) {
				alert('Không thể kết nối với database!')
				return
			}
			this.setState({ loading: false, authenticate: true })
			return
		}
		this.setState({authenticate: false})
	}

	render(){
		const clickSubmit = (event) =>{
			event.preventDefault()
			if(Number(this.state.user.username) < 1){
			  alert("Bạn phải nhập username")
			  return
			}
			axios
				.post(process.env.REACT_APP_BACKEND_URL + '/users/', {
					username: this.state.user.username,
					email: this.state.user.email,
					role: this.state.user.type.id,
					password: this.state.user.password,
					confirm: true
				},{
					headers: {
					'Authorization':'bearer '+ Cookie.get('token'),
					},
				})
				.then(response => {
					alert('Tạo tài khoản thành công!')
					this.props.history.push('/admin/accounts')
				})
				.catch(error => {
					alert('Tạo tài khoản thất bại!')
					console.log('An error occurred:', error.response)
				})
			return
		}
		
		const clickBack = (event) =>{
			event.preventDefault()
			this.props.history.push('/admin/accounts')
		}
		
		const handleChangeType = async (typeName) =>{
			let response = await fetch(process.env.REACT_APP_BACKEND_URL + '/users-permissions/roles' ,{
				headers: {
					'Authorization':'bearer '+ Cookie.get('token'),
				},
			})
			if (!response.ok) {
				return
			}
			let data = await response.json()
			let roleList = data.roles
			let role = roleList.find((index) => typeName===index.name)
			console.log(role)
			this.setState({ user: {...this.state.user,type: role} })
			console.log(data)
		}
		
		
		if (!this.state.loading && Cookie.get('token')) {
			return (
			<div className="container">
	
			<div className="row">
				<h2>Tạo tài khoản</h2>
				<div className="col-lg-10 container" >
	
					<form id="account-create-form" onSubmit={clickSubmit}>
			
						<div className="controls">
							<div className="row">
								<div className="col-lg-6">
									<div className="form-group">
										<label htmlFor="form_name">Username :</label>
										<input id="form_username" type="text" className="form-control" value={this.state.user.username} required="required"
											data-error="Username is required." onChange={(e)=>this.setState({user:{...this.state.user,username:e.target.value}})} />
									</div>
								</div>
								<div className="col-lg-6">
									<div className="form-group">
										<label htmlFor="form_email"> Email :</label>
										<input id="form_email" type="email" className="form-control" value={this.state.user.email} required="required"
											data-error="Email is required." onChange={(e)=>this.setState({user:{...this.state.user,email:e.target.value}})}/>
									</div>
								</div>
							</div>
	
							<div className="row">
								<div className="col-lg-6">
									<div className="form-group">
										<label>Mật khẩu :</label>
										<input type="password" className="form-control" value={this.state.user.password}
										onChange={(e)=>this.setState({user:{...this.state.user,password:e.target.value}})} />
									</div>
								</div>
								<div className="col-lg-6">
									<div className="form-group">
										<label>Nhập lại mật khẩu :</label>
										<input type="password" className="form-control" value={this.state.user.confirmPassword}
										onChange={(e)=>this.setState({user:{...this.state.user,confirmPassword:e.target.value}})} />
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-6">
									<div className="form-group">
										<label htmlFor="form_type">Loại :</label>
										<select id="form_type" className="form-control" value={this.state.user.type.name}
										onChange={(e)=>handleChangeType(e.target.value)}>
											<option value="none">Chọn loại</option>
											<option value="Customer"> Customer</option>
											<option value="Manager"> Manager</option>
											<option value="Admin"> Admin </option>
										</select>
									</div>
								</div>
							</div>
	
							<div id="result" style={{color:"red"}}>
							</div>
	
							<input type="submit" className="btn btn-primary" value="Tạo" />
							<button className="btn btn-primary" onClick={(e)=>clickBack(e)} style={{marginLeft: 30+'px'}} > Trở về</button>
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
		return (<h2 className="ProductList-title">Waiting for API...</h2>)
	}

}

export default AccountCreate