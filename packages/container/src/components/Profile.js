import React,{ useState, useEffect } from "react";
import { loginRequest } from "../authConfig"; 
import { useMsal } from "@azure/msal-react";
import { ProfileData } from "./ProfileData";
import { WelcomeName } from "./WelcomeName";
import { callMsGraph } from '../utils/fetch';

const Profile = () => {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);

    // const name = accounts[0] && accounts[0].name;

    const RequestProfileData = () => {
        const request = {
            ...loginRequest,
            account: accounts[0]
        };

        // Silently acquires an access token which is then attached to a request for Microsoft Graph data
        instance.acquireTokenSilent(request).then((response) => {
            callMsGraph(response.accessToken).then(response => setGraphData(response));
        }).catch((e) => {
            instance.acquireTokenPopup(request).then((response) => {
                callMsGraph(response.accessToken).then(response => setGraphData(response));
            });
        });
    }

    useEffect(() => {
        RequestProfileData()
    },[])


    return (
        <div>
            <WelcomeName />
            {graphData ? 
                <ProfileData graphData={graphData} />
                :
            null
            }
        </div>
    )
}

export default Profile;