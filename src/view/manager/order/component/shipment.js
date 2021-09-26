import React,{Component} from 'react'

export default class Shipment extends Component{
    render(){
        return(
            <div className='shipment'>
				<h5 className='ship-id'>Shipment: #{this.props.shipment.id}</h5>
				<h5 style={{color:'blueviolet'}}>
					{this.props.shipment.status}
				</h5>
				<table className='table'>
					<thead>
						<tr>
							<th style={{width:40+'%'}}>Name</th>
							<th style={{width:20+'%'}}>Color</th>
							<th style={{width:20+'%'}}>Cuộn</th>
							<th style={{width:20+'%'}}>M</th>
						</tr>
					</thead>
					<tbody>
					{this.props.shipment.productList.map((item,index)=>{
						return(
						<tr key={index}>
							<td><span>{item.product.name}</span></td>
							<td>{item.color}</td>
							<td>
								{item.quantity? item.quantity:'0'}
							</td>
							<td>
								{item.quantity_m? item.quantity_m:'0'}
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