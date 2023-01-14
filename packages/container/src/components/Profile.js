import React,{ useState, useEffect } from "react";
import { InteractionType } from "@azure/msal-browser";
import { useMsalAuthentication } from "@azure/msal-react";
import { ProfileData } from "./ProfileData";
import { WelcomeName } from "./WelcomeName";
import { fetchData } from '../utils/fetch';

export const Profile = () => {
    const [graphData, setGraphData] = useState(null);
    const { result, error } = useMsalAuthentication(InteractionType.Popup, {
        scopes: ["User.Read"]
    });

    useEffect(() => {
        console.log(result,error)
        if (!!graphData) {
            return;
        }

        if (!!error) {
            console.log(error);
            return;
        }

        if (result) {
            const { accessToken } = result;
            fetchData('https://graph.microsoft.com/v1.0/me', accessToken)
                .then(response => setGraphData(response))
                .catch(error => console.log(error));
        }
    }, [graphData, error, result]);

    return (
        <div>
            <WelcomeName />
            { graphData ? <ProfileData graphData={graphData} /> : null }
        </div>
    )
}