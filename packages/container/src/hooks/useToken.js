import { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { customApiRequest } from "../authConfig";

function useTokenApi() {
  let { instance, accounts } = useMsal();
  const [token, setToken] = useState(null);
  function callTokenApi() {
    instance
      .acquireTokenSilent({
        ...customApiRequest,
        account: accounts[0],
      })
      .then(async (response) => {
        setToken(response.accessToken);
      })
      .catch((err) => {
        sessionStorage.clear();
      });
  }
  useEffect(() => {
    callTokenApi();
    // eslint-disable-next-line
  }, []);

  return token;
}
export default useTokenApi;
