import axios from 'axios'

const instance = axios.create({
        baseURL:'localhost:3006'
})

export default instance;