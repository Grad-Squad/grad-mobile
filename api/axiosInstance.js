import axios from 'axios';

export default axios.create({
  baseURL: 'http://192.168.1.5:3000',
  timeout: 1000,
});
