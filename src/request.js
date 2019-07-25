import axios from 'axios'

export default async function request (url, httpMethod = axios.get) {
  try {
    const response = await httpMethod(url)
    return response
  } catch (e) {
    console.log(e)
  }
}
