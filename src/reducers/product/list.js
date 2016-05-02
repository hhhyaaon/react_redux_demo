import Immutable from "immutable"
import {
    GET_PRODUCT_LIST,
    GET_CHECKED_PRODUCTS,
    DELETE_PRODUCTS} from "../../constants/actionType.js"

let initState = Immutable.Map({
    keyword: "",
    filter: {},
    products: { data: [] },
    checkedPdts: []
});

const pdts = Immutable.Map({
    total: 10,
    pageSize: 5,
    pageIndex: 1,
    data: [{
        id: "1",
        name: "达克宁",
        commonName: "硝酸咪康挫散",
        createTime: 1460360969953,
        creater: "王花花",
        state: 1
    }, {
            id: "2",
            name: "息斯敏",
            commonName: "阿司咪挫片",
            createTime: 1424360969953,
            creater: "胡毛毛",
            state: 2
        }, {
            id: "3",
            name: "吗丁啉",
            commonName: "多潘立酮片",
            createTime: 1460360935953,
            creater: "何狗狗",
            state: 2
        }, {
            id: "4",
            name: "派瑞松",
            commonName: "阿斯杀星片",
            createTime: 1460360977953,
            creater: "李猫猫",
            state: 1
        }, {
            id: "5",
            name: "派瑞松1",
            commonName: "阿斯杀星片",
            createTime: 1460360977953,
            creater: "李猫猫",
            state: 1
        }, {
            id: "6",
            name: "派瑞松2",
            commonName: "阿斯杀星片",
            createTime: 1460360977953,
            creater: "李猫猫",
            state: 1
        }, {
            id: "7",
            name: "派瑞松",
            commonName: "阿斯杀星片",
            createTime: 1460360447953,
            creater: "李猫猫",
            state: 2
        }, {
            id: "8",
            name: "派瑞asd松",
            commonName: "阿斯杀星片",
            createTime: 1460362277953,
            creater: "李猫猫",
            state: 1
        }, {
            id: "9",
            name: "派as瑞松",
            commonName: "阿斯杀星片",
            createTime: 1477360977953,
            creater: "李猫猫",
            state: 2
        }, {
            id: "10",
            name: "派瑞dd松",
            commonName: "阿斯杀星片",
            createTime: 1460990977953,
            creater: "李猫猫",
            state: 1
        }, {
            id: "11",
            name: "派瑞dd松22333",
            commonName: "阿斯杀星片",
            createTime: 1460990977953,
            creater: "李1猫猫",
            state: 1
        }]
});

export default function productList(state = initState, action) {

    switch (action.type) {
        case GET_PRODUCT_LIST:
            return _getProductList(state, Immutable.fromJS(action.data));
        case GET_CHECKED_PRODUCTS:
            return _getCheckedProducts(state, Immutable.fromJS(action.data));
        case GET_CHECKED_PRODUCTS:
            return _deleteProducts(state);
        default:
            return state
    }
}

function _getProductList(state, value) {
    //------删除
    value = pdts;// todo
    //--------
    return state.set("products", value);
}

function _getCheckedProducts(state, value) {
    return state.set("checkedPdts", value);
}

function _deleteProducts(state) {
    return state;
}