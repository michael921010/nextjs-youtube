import axios from "axios";
import querystring from "querystring";

const $axios = axios;

export const GET = async (url, params) => {
  const config = {
    params,
  };

  // const res = await fetch(`${url}?${querystring.stringify(params)}`, {
  //   method: "GET",
  // });
  // return await res.json();
  return axios.get(url, config);
};
