import axios from 'axios'
// eslint-disable-next-line no-undef
const baseUrl = `${process.env.REACT_APP_URL_BACKEND}`
// eslint-disable-next-line no-undef
console.log("process.env.REACT_APP_URL_BACKEND", process.env.REACT_APP_URL_BACKEND);
// eslint-disable-next-line no-undef
console.log("process.env", process.env);


const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }
  
  const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
  }
  
  const remove = id => {
    const url = `${baseUrl}/${id}`
    const request = axios.delete(url)
    return request.then(response => response.data)
  }
  
  const update = (id, updatedObject) => {
    const url = `${baseUrl}/${id}`
    const request = axios.put(url, updatedObject)
    return request.then(response => response.data)
  }
  
  export default {
    getAll,
    create,
    remove,
    update
  }