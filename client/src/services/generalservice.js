import axios from "axios";

export default class Service{
    constructor(){

        this.service = axios.create({
            baseURL: "http://localhost:5000"
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


}