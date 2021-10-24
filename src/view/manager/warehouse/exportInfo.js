import axios from 'axios'
import React from 'react'
import Cookie from 'js-cookie'
import TimeDiff from '../../../Utils/dateTime'

export default class ExportInfo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            loading: true,
            export: {},
        }
    }

    async componentDidMount(){

        await axios
            .get(process.env.REACT_APP_BACKEND_URL + '/exports/' + this.props.match.params.id,{
                headers: {
                    'Authorization':'bearer '+ Cookie.get('token'),
                }
            })
            .then(res=>{
                console.log(TimeDiff(new Date(res.data.createdAt.slice(0,19)+"Z"),new Date()))
                this.setState({export:res.data})
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
                                        <h5>EXPORT DETAIL</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <div className="page-contain">
                        <div className='row'>
                            <div className='col-8'>
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
                                                    {this.state.export.productList.map((item,index)=>{
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

                            <div className='col-4'>
                                <div className='card'>
                                    <div className='card-header'>
                                        <strong>THÔNG TIN:</strong>
                                    </div>
                                    <div className='card-body'> 
                                        <strong>NGƯỜI TẠO:</strong><span>{this.state.export.creator.username}</span><br/>
                                        <strong>CẬP NHẬT:</strong><span>{this.showTimediff()}</span><br/>
                                        <strong>NGÀY XUẤT:</strong>
                                        <span>{this.state.export.createdAt.slice(0,10) + " " +this.state.export.createdAt.slice(11,19)}</span><br />
                                    </div>
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
    showTimediff = () =>{
        let time = TimeDiff(new Date(this.state.export.updatedAt.slice(0,19)+'Z'),new Date())
        if(time.years) return time.years+" năm trước"
        if(time.months) return time.months+" tháng trước"
        if(time.days) return time.days+" ngày trước"
        if(time.hours) return time.hours+" giờ trước"
        if(time.minutes) return time.minutes+" phút trước"
        if(time.seconds) return time.seconds+" giây trước"
        else return "vài giây trước"
    }
} 