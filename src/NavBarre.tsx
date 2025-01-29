import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router';
import { useAuth0 } from "@auth0/auth0-react"

export function NavBarre() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <>
      {[false].map((expand) => (
        <Navbar expand={expand} className="bg-body-tertiary mb-3">
          <Container fluid>
            <div className='d-flex justify-content-center'>
              <Navbar.Brand href="/"><h3>Retour à l'accueil</h3></Navbar.Brand>  
              {isAuthenticated ? (  
                <>         
                  <Button variant='light' style={{height: '40px'}} onClick={() => logout()}>Se déconnecter</Button>
                </>
              ) : (                    
                <Button variant='light' style={{height: '40px'}} onClick={() => loginWithRedirect()}>Se connecter</Button>              
              )}
            </div>           
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Liens des projets
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link as={Link} to="projets/demineur">Demineur</Nav.Link>
                  <Nav.Link as={Link} to="projets/horloge">Horloge</Nav.Link>
                  <Nav.Link as={Link} to="projets/yahtzee">Yahtzee</Nav.Link>             
                </Nav>                
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}
