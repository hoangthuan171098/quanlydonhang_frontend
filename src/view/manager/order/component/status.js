import { Component } from "react"

export default class Status extends Component{
    render(){
        let status = this.props.status
        if(!status){
            return(
                <span>ERROR</span>
            )
        }
        else{
            if(status==='waiting to deliver'){
                return(
                    <span className='status status-waiting2deliver'>waiting to deliver</span>
                )
            }
            else if(status==='waiting'){
                return(
                    <span className='status status-waiting'>waiting</span>
                )
            }
            else if(status==='processing'){
                return(
                    <span className='status status-processing'>processing</span>
                )
            }
            else if(status==='partial delivering'){
                return(
                    <span className='status status-delivering'>partial delivering</span>
                )
            }
            else if(status==='partial delivered'){
                return(
                    <span className='status status-delivered'>partial delivered</span>
                )
            }
            else if(status==='delivering'){
                return(
                    <span className='status status-delivering'>delivering</span>
                )
            }
            else if(status==='delivered'){
                return(
                    <span className='status status-delivered'>delivered</span>
                )
            }
            else if(status==='done'){
                return(
                    <span className='status status-done'>done</span>
                )
            }
            else if(status==='cancled'){
                return(
                    <span className='status status-cancled'>cancled</span>
                )
            }

        }
    }
}