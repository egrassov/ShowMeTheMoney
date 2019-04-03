import axios from "axios";

export default class Service{
    constructor(){

        this.service = axios.create({
            baseURL: "https://showmethemoney-dhh.herokuapp.com/api"
        })
    }

    getZipStats = () => {

        console.log(process.env.REACT_APP_URL+"/")
        return this.service.get("/")
        .then(res => {
            console.log("holi")
            console.log(res.data)
            return res.data
        })
        .catch( err => {
            console.log(err)
        })
    }

    getZipRelations = () => {
        return this.service.get("/zipsrelations")
        .then(res => {
            return res.data
        })
        .catch( err => {
            console.log(err)
        })
    }

    getCitybyHours = () => {
        return this.service.get("/txsbyhours")
        .then(res => {
            return res.data
        })
        .catch( err => {
            console.log(err)
        })
    }

    getTxsforCompare = () => {
        return this.service.get("/txsforcompare")
        .then(res => {
            return res.data
        })
        .catch( err => {
            console.log(err)
        })
    }


}