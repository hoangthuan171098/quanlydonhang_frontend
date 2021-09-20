import React,{Component} from 'react'

export default class Shipment extends Component{
    render(){
        return(
            <div className='row'>
				<h5>Shipment: {this.props.shipment.id}</h5>
				<h5 style={{color:'blueviolet',marginLeft:50+'px'}}>{this.props.shipment.status}</h5>
				<table className='table'>
					<thead>
						<tr>
							<th></th>
							<th>Name</th>
							<th>Color</th>
							<th>Quantity</th>
						</tr>
					</thead>
					<tbody>
					{this.props.shipment.productList.map((item,index)=>{
						return(
						<tr key={index}>
							<td style={{width: 150 + 'px'}}>
								<img className='img-preview' src={process.env.REACT_APP_BACKEND_URL + item.product.image.url}></img>
							</td>
							<td><span>{item.product.name}</span></td>
							<td>
								<div className='color-div' style={{backgroundColor:item.color}}></div>
							</td>
							<td>
								{item.quantity_m ? 
									(item.quantity? 
									item.quantity_m + ' x m,' + item.quantity + ' x roll'
									: item.quantity_m + ' x m')
									:item.quantity + ' x roll'
								}
							</td>
						</tr>
						)
					})}
					</tbody>
				</table>
			</div>
        )
    }
}