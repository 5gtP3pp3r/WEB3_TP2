import { Outlet, Navigate } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';
import { BsCloudDownloadFill } from "react-icons/bs";

export const RoutePrivee = () => {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <h1><BsCloudDownloadFill  className="text-primary"  /></h1>

                <h3> ...Chargement</h3>
            </div>
        );
    }

    return (
        isAuthenticated ? <Outlet /> : <Navigate to="/PageConnection" />  
    );
};
