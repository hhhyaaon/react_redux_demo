import Immutable from "immutable"
import {
    SET_PRODUCT,
    SAVE_PRODUCT
} from "../../constants/actionType.js"

let initState = Immutable.Map({
    product: {}
});

export default function productEdit(state = initState, action) {

    switch (action.type) {
        case SET_PRODUCT:
            return _setProduct(state, Immutable.fromJS(action.data));
        case SAVE_PRODUCT:
            return _saveProduct(state, Immutable.fromJS(action.data));
        default:
            return state
    }
}

function _setProduct(state, value) {
    //todo extend
    return state.merge({ product: value });
}

function _saveProduct(state, value) {
    return state
}
