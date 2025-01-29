import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';


export function Footer() {
    const { isAuthenticated } = useAuth0();
    const navigate = useNavigate();

    return (
        <Container>
        <Row className="d-flex justify-content-center mb-1">
        {isAuthenticated ? (
            <ButtonGroup aria-label="Bouton liens exercicesrang1">                                    
                <Button variant='light' onClick={() => navigate("/projets/demineur")} className="btn btn-primary" style={{width:200}}>Démineur</Button>
                <Button variant='light' onClick={() => navigate("/projets/horloge")} className="btn btn-primary" style={{width:200}}>Horloge</Button>
                <Button variant='light' onClick={() => navigate("/projets/yahtzee")} className="btn btn-primary" style={{width:200}}>Yahtzee</Button>                               
            </ButtonGroup>  
            ) : (
                <></>
            )} 
        </Row>
        </Container>
    );
}