import React from "react";
import Typography from "@mui/material/Typography";
import { useMsal,useIsAuthenticated } from "@azure/msal-react";
import { useState, useEffect } from "react";

export const WelcomeName = () => {
    const isAuthenticated = useIsAuthenticated()
    const { instance } = useMsal();
    const [username, setUsername] = useState('');

    useEffect(() => {
        const currentAccount = instance.getAllAccounts()[0];

        if (currentAccount) {
            setUsername(currentAccount?.name);
        }
    }, [instance, isAuthenticated]);

    return <Typography variant="h6">Welcome, {username}</Typography>;
};