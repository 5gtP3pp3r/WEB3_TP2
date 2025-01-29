import { Outlet, Navigate } from 'react-router'

export const RoutePrivee = () => {
    const estAuthentifie = false;

    return (
        estAuthentifie ? <Outlet /> : <Navigate to="/"/>
    )
}