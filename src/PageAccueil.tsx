import { Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router';

export function PageAccueil() {
    const navigate = useNavigate();
    const { isAuthenticated, loginWithRedirect} = useAuth0();

    return (
        <div>
            <h3>Page d'accueil</h3>
            
            <div>
            {isAuthenticated ? (
                <>
                    <p>BLABLABLA  Allez voir les jeux bande de con!</p>
                    <Button variant='light'  onClick={() => navigate("/projets/demineur")} className="btn btn-primary">Voir les Jeux</Button>
                </> 
            ) : (
                <>
                    <p>BLABLABLA  Connectez vous bande de con!</p>
                    <Button variant='light'  onClick={() => loginWithRedirect()}>Se connecter</Button> 
                </>
            )}
            <div className="d-flex justify-content-center m-5">
            </div>    
            </div>
        </div>
        
    )
}
