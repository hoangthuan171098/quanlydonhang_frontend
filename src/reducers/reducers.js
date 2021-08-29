import { combineReducers } from 'redux'
import Cookie from 'js-cookie'
import { LOGIN,LOGOUT } from '../actions/auth'

function auth(state = {}, action){
   switch (action.type) {
         case LOGIN:
            Cookie.set("id",action.payload.user.id)
            Cookie.set("username",action.payload.user.username)
            Cookie.set("token",action.payload.jwt)
            Cookie.set("role",action.payload.user.role.name)
            return {
               username: action.payload.user.username,
               authenticate: true
            }
         case LOGOUT:
            Cookie.remove('username')
            Cookie.remove('id')
            Cookie.remove('token')
            Cookie.remove('role')
            return {}
         default:
            return state
   }
}

const app = combineReducers({
   auth
})
export default app