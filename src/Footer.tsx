import 'bootstrap/dist/css/bootstrap.min.css';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router';


export function Footer() {
    const { isAuthenticated } = useAuth0();
    const navigate = useNavigate();

    return (
        <div className="d-flex justify-content-center mb-1 fixed-bottom bg-light">       
            <ButtonGroup aria-label="Bouton liens exercicesrang1">
                {isAuthenticated ? (
                <>                             
                    <Button variant='light' onClick={() => navigate("/projets/demineur")} className="btn btn-primary rounded-0" style={{width:300}}>Démineur</Button>
                    <Button variant='light' onClick={() => navigate("/projets/horloge")} className="btn btn-primary" style={{width:300}}>Horloge</Button>
                    <Button variant='light' onClick={() => navigate("/projets/yahtzee")} className="btn btn-primary" style={{width:300}}>Yahtzee</Button>                               
                </> 
                ) : (
                <></>
                )} 
                <Button variant='secondary' onClick={() => navigate("/")} className="btn btn-primary rounded-0" style={{width:300}}>Accueil</Button>
            </ButtonGroup>       
        </div>
    );
}