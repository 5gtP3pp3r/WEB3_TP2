import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


export function Footer() {
    return (
        <Container>
        <Row className="d-flex justify-content-center mb-1">
            <ButtonGroup aria-label="Bouton liens exercicesrang1">
                <a href="/projets/demineur" className="btn btn-primary" style={{width:200}}>Démineur</a>
                <a href="/projets/horloge" className="btn btn-primary" style={{width:200}}>Horloge</a>
                <a href="/projets/yahtzee" className="btn btn-primary" style={{width:200}}>Yahtzee</a>
            </ButtonGroup>  
        </Row>
        </Container>
    );
}