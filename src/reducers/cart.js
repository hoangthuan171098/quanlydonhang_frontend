import * as Types from './../constants/ActionTypes';
var initState = [];

const cart = (state =initState,action) => {
    var {product,quantity} = action;
    var index = -1;
    switch(action.type){
        case Types.ADD_TO_CART:
            index = findProductInCart(state, product);
            if(index =-1){
                state[index].quantity +=quantity;
            }
            else{
                state.push({product,quantity})
            }
        return [...state]

        default: return [...state];
    }
}

var findProductInCart = (cart, product) => {
    var index = -1;
    if (cart.length > 0) {
        for (var i = 0; i < cart.length; i++) {
            if (cart[i].product._id === product._id) {
                index = i;
                break;
            }
        }
    }
    return index;
}

export default cart;