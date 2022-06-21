import axios from "axios";
import { toast } from 'react-toastify';
import logger from './logService';

// handling unexpected error using axios interceptor
axios.interceptors.response.use(null, (error) => {
  console.log("error");
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
   logger.log(error);
    toast.error("Unexpected error occur!...");
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
