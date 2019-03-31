import axios from "axios";

export default class Service{
    constructor(){

        this.service = axios.create({
            baseURL: "http://localhost:5000/api"
        })
    }

    getZipStats = () => {
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

    getCitybyHours = () => {
        return this.service.get("/txsbyhours")
        .then(res => {
            return res.data
        })
        .catch( err => {
            console.log(err)
        })
    }


}