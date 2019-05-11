import axios from 'axios';
import config from '../config';

const baseUrl = config.backendUrl;

let request = async (method, url, body) => {
  const user = JSON.parse(localStorage.getItem('user'));

  try {
      const res = await axios({
          baseURL: baseUrl,
          method,
          url,
          headers: {
              'Authorization':  user ? 'Bearer ' + user.token : '',
              'Content-Type': 'application/json'
          },
          data: body
      })

      console.log('Request was a success - status: ', res.status);
      if (res.status >= 400) {
        console.log('status is >= 400');
          throw new Error(`${method}: ${url} failed with ${res.status} - ${res.data}`)
      }

      return res.data;
  } catch (e) {
    console.log('Request failed');
      console.error('error @ httpRequest: ', e)
      throw e
  }
}

export default request;