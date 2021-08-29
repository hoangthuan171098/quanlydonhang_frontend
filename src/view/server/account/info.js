import React, { Component } from 'react'
import Cookie from 'js-cookie'

class AccountInfo extends Component {
	constructor(props) {
		super(props)

		this.state = {
			loading: true,
			authenticate: true,
			user: {}
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
			if (!response1.ok || !response2.ok) {
				console.log("Không thể kết nối với sever!");
				return
			}
			let data1 = await response1.json();
			let data2 = await response2.json();
			this.setState({ loading: false,authenticate: true, user: data1 });
			if(data2.length !== 0){
				this.setState({info: data2[0]});
			}
			return
		}
		this.setState({authenticate: false});
	}

	detailInfo = () =>{
		if(this.state.info){
			return(
			<>
				<tr>        
					<td> Số điện thoại: </td>
					<td className="text-primary">
						{this.state.info.phoneNumber}
					</td>
				</tr>
		
				<tr>        
					<td> Họ và tên: </td>
					<td className="text-primary">
						{this.state.info.lastName + ' ' + this.state.info.firstName}
					</td>
				</tr>
				<tr>        
					<td> Giới tính: </td>
					<td className="text-primary">
						{this.state.info.gender? 'Nam' : 'nữ'}
					</td>
				</tr>
				<tr>        
					<td> Công ty: </td>
					<td className="text-primary">
						{this.state.info.firm}
					</td>
				</tr>
				<tr>        
					<td> Địa chỉ: </td>
					<td className="text-primary">
						{this.state.info.address}
					</td>
				</tr>
			</>
			)
		}
		return (<></>);
	}

	render() {
		const clickUpdate = () =>{
			this.props.history.push('/admin/account/' + this.state.user.id + '/update')
		}
	  
		const clickBack = () =>{
			this.props.history.push('/admin/accounts')
		}
	  
		if (!this.state.loading && Cookie.get('token')) {
			return (
				<div className="container bootstrap snippet">
					<h2>THÔNG TIN TÀI KHOẢN :</h2>
	  
					<div className="container col-lg-10">
	  
						<div className="table-responsive">
							<table className="table table-user-information">
								<tbody>
									<tr>  
										<td> Account ID: </td>
										<td className="text-primary">
											{this.state.user.id}
										</td>
									</tr>
									<tr>    
										<td> Tên tài khoản: </td>
										<td className="text-primary">
											{this.state.user.username}
										</td>
									</tr>
									<tr>    
										<td> Email: </td>
										<td className="text-primary">
											{this.state.user.email}
										</td>
									</tr>
									
									<tr>        
										<td> Tạo lúc: </td>
										<td className="text-primary">
											{this.state.user.createdAt}
										</td>
									</tr>
									
									<tr>        
										<td> Loại: </td>
										<td className="text-primary">
											{this.state.user.role.name}
										</td>
									</tr>
									
									<tr>        
										<td> Khóa: </td>
										<td className="text-primary">
											{this.state.user.blocked? 'Có' : 'Không'}
										</td>
									</tr>
			
									<tr>        
										<td> Xác nhận: </td>
										<td className="text-primary">
											{this.state.user.confirmed? 'Rồi' : 'Chưa'}
										</td>
									</tr>
			
									<this.detailInfo />
			
									<tr>
										<td className="last-row">  
											<button className="btn btn-primary" onClick={clickUpdate} style={{marginRight:30+"px"}}>Thay đổi</button>
										</td>
										<td>
											<button className="btn btn-primary" onClick={clickBack}>Trở về</button>
										</td>
									</tr>                                
								</tbody>
							</table>
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


export default AccountInfo;