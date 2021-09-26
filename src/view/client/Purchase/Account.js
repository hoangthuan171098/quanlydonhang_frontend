import React, { Component } from 'react'
import Cookie from 'js-cookie'
export default class Account extends Component {
  constructor(props) {
		super(props)

		this.state = {
			loading: true,
			authenticate: true,
			user: {},
      info:{}
		}
	}

  async componentDidMount() {
		if(Cookie.get('role') === 'Public'){     
			let response1 = await fetch(process.env.REACT_APP_BACKEND_URL + "/users/" + Cookie.get('id'),{
				headers: {
					'Authorization':'bearer '+ Cookie.get('token'),
				},
			});
      let response2 = await fetch(process.env.REACT_APP_BACKEND_URL + "/customer-infos?customerId=" + Cookie.get('id'),{
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
				this.setState({info: data2});
			}
      return
		}
		this.setState({authenticate: false});
	}
    render() {
      console.log(this.state.info)
        return (
            <div className="Account_layout">
              <h3 className="styles_Heading">
                Thông tin tài khoản
              </h3>
              <div className="Account_info">
                <form>
                  <div className="form-control">
                    <label className="input-label">Họ Tên</label>
                    <div>
                      <input type="text" name="fullName" maxLength="128" className="input-info" value={this.state.user.username} /> 
                    </div>
                  </div>
                  <div className="form-control">
                    <label className="input-label">Số điện thoại</label>
                    <div>
                      <input type="tel" name="phoneNumber" maxLength="128" className="input-info" value="0394007104" /> 
                    </div>
                  </div>
                  <div className="form-control">
                    <label className="input-label">Email</label>
                    <div>
                      <input type="text" name="email" maxLength="128" className="input-info" value={this.state.user.email} /> 
                    </div>
                  </div>
                  <div className="form-control">
                    <label className="input-label">Công ty</label>
                    <div>
                      <input type="text" name="company" maxLength="128" className="input-info" value="ABC" /> 
                    </div>
                  </div>
                  {/* <div className="form-control">
                    <label className="input-label">Địa Chỉ</label>
                    <div>
                      <input type="text" name="address" maxLength="128" className="input-info" value="Kí túc xá khu A" /> 
                    </div>
                  </div> */}

                  <div className="form-control">
                    <label className="input-label">&nbsp;</label>
                    <button type="submit" className="btn-submit">Cập nhật</button>
                  </div>
                </form>
              </div>
            </div>
        )
    
  }
}
