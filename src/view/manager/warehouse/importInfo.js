import axios from 'axios'
import React from 'react'
import Cookie from 'js-cookie'

export default class ImportInfo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            loading: true,
            import: {},
        }
    }

    async componentDidMount(){

        await axios
            .get(process.env.REACT_APP_BACKEND_URL + '/imports/' + this.props.match.params.id,{
                headers: {
                    'Authorization':'bearer '+ Cookie.get('token'),
                }
            })
            .then(res=>{
                this.setState({import:res.data})
            })
            .catch(err=>{
                alert('Cannot connect to server 2!')
            })
        
        this.setState({loading:false})
    }
    
    render(){
        if(!this.state.loading){
            return(
                <div>
                    <div className="page-header">
                        <div className="page-block">
                            <div className="row align-items-center">
                                <div className="col-md-12 p-0">
                                    <div className="page-header-title">
                                        <h5>IMPORT DETAIL</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <div className="page-contain">
                        <div className='card'>
                            <div className='card-body'>
                                <strong className="d-block">Thong tin:</strong>
                                <strong>Ngay xuat:</strong>
                                <span>{this.state.import.createdAt.slice(0,10) + " " +this.state.import.createdAt.slice(11,19)}</span><br />
                                <strong>Nguoi tao:</strong><span>{this.state.import.creator.username}</span>
                            </div>
                        </div>

                        <div className='card'>
                            <div className='card-body'>
                                <div className="col-sm-12">
                                    <table className="table">
                                        <thead className="brand-blue">
                                            <tr>
                                                <th>Name</th>
                                                <th>Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.import.productList.map((item,index)=>{
                                                return(
                                                    <tr key={index}>
                                                        <td>{item.product.name}</td>
                                                        <td>   
                                                            <table className='w-100'><tbody>
                                                                {item.quantity.map((item1,index1)=>{
                                                                    return(
                                                                        <tr key={index1}>
                                                                            <td style={{border:'none',padding:0,width:50+'%'}}>
                                                                                {item1.color}
                                                                            </td>
                                                                            <td style={{border:'none',padding:0,width:25+'%'}}>
                                                                                {item1.m? item1.m:0}
                                                                            </td>
                                                                            <td style={{border:'none',padding:0,width:25+'%'}}>{item1.roll? item1.roll:0}</td>
                                                                        </tr>
                                                                    )
                                                                })}
                                                            </tbody></table>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return(
            <div>Waiting API</div>
        )
    }
} 