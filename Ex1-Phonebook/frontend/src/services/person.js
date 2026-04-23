import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const postPerson = (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const putPerson = (personData) => {
    const request = axios.put(`${baseUrl}/${personData.id}`, personData)
    return request.then(response => response.data)
}

export default {getAll, postPerson, deletePerson, putPerson}