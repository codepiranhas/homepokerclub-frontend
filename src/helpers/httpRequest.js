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

      if (res.status >= 400) {
          throw new Error(`${method}: ${url} failed with ${res.status} - ${res.data}`)
      }

      return res.data;
  } catch (e) {
      throw e
  }
}

export { axios };
export default request;
