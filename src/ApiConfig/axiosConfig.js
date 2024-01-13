import axios from "axios";
const URL ="https://api.trello.com/1"
const KEY = "36d88467b11d2e9225858ba675f2b1c5"
const TOKEN = "ATTA05d1022f100e380d66e722a4b6c25604b7133d1d17692b426cbfb0aaa2600129380E912A"

const api = axios.create({
    baseURL:URL,
    params:{
        key:KEY,
        token:TOKEN
    }
})

export default api