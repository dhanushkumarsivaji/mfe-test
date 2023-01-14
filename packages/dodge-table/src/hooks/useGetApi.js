import { useState, useEffect } from "react";
import { API } from "../utils/axios";

function useGetApi(url="accounts", token) {
  const [result, setResult] = useState({
    res: null,
    error: null,
    status: null,
    loading: true,
  });
  async function callApi() {
    if (token) {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await API.get(url)
        .then((res) => {
          setResult({
            ...result,
            res: res.data,
            status: res.status,
            loading: false,
          });
        })
        .catch((err) => {
          setResult({
            ...result,
            error: err?.response,
            status: err?.response?.status,
            loading: false,
          });
        });
    }
  }
  useEffect(() => {
    callApi();
    // eslint-disable-next-line
  }, [token]);

  return { result, callApi };
}
export default useGetApi;
