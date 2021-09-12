import {Component} from 'react'
import { withRouter } from 'react-router'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'


class Header extends Component {
    logoutClick = (e) =>{
        e.preventDefault()
        this.props.logoutHandle()
        this.props.history.push('/login')
    }

    render(){
        return(
            <div className='Header'>
                <div className='more-dropdown'>
                    <button className='btn btn-primary dropdown-toggle' type='button' data-toggle='dropdown'>
                        {this.props.username}
                        <span className='caret'></span>
                    </button>
                    <ul className='dropdown-menu'>
                        <li><Link to='/admin/profile'>Profile</Link></li>
                        <li><Link to='/login' onClick={e=>this.logoutClick(e)} >Logout</Link></li>
                    </ul>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
       username: state.auth.username
    }
}

function mapDispatchToProps(dispatch){
    return{
        logoutHandle: () =>{
            dispatch({
                type: 'LOGOUT'
            })
        }
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Header))

