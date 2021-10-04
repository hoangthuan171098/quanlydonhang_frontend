import React,{Component} from 'react'

export default class Shipment extends Component{
    render(){
        return(
			<div className='w-75 float-left Shipment-show'>
				<div className='module'>
					<div className='module-body'>
						<div className='row'>
							<span className='impress w-100'>Shipment #{this.props.shipIndex}</span><br/>
							<span> ID: {this.props.shipment.id} -&ensp;</span>
							<span>  {this.props.shipment.status}</span>
							<table className='table'>
								<thead>
									<tr>
										<th>Name</th>
										<th>Color</th>
										<th>Cuộn</th>
										<th>M</th>
									</tr>
								</thead>
								<tbody>
								{this.props.shipment.productList.map((item,index)=>{
									return(
									<tr key={index}>
										<td><span>{item.product.name}</span></td>
										<td>{item.color}</td>
										<td>
											{item.quantity? item.quantity:0}
										</td>
										<td>
											{item.quantity_m? item.quantity_m:0}
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
        )
    }
}