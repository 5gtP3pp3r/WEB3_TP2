import { Button,  Col, Row } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router';


export function PageAccueil() {
    const navigate = useNavigate();
    const { isAuthenticated, loginWithRedirect} = useAuth0();

    return (
        <div className='m-5'>
            <h3>Page d'accueil</h3>           
            <div>
            {isAuthenticated ? (
                <div className='mt-5'>
                    <Row>
                        <Col xs={4}> 
                            <div style={{width:'350px'}}>    
                                <img 
                                    src="images/JeuYahtzee.png" 
                                    alt="Yahtzee" 
                                    onClick={() => navigate("/projets/yahtzee")} 
                                    style={{ cursor: 'url(../images/Curseurs/curseurDe6.png), auto', borderRadius: '10px'}}
                                />    
                            <p className='mt-3'>On a tous déjà oublié les règlements ou comment compter les points... plus besoin 
                                                de papier et crayon! Essayez cette version numérique du classique "YAHTZEE!" </p>  
                            <p className='d-flex justify-content-end'>Par Élie Caron</p>
                        </div>         
                        </Col>
                        <Col xs={4}>  
                            <div style={{width:'350px'}}>  
                                <p> Vous vous souvenez du classique "Démineur" de window 98? Voici une version revue de se jeu sous estimé!</p>
                                <p className='d-flex justify-content-end'>Par William Crépault</p>
                                <img    
                                    src="images/MinesweeperFondWin98.png" 
                                    alt="Demineur" 
                                    onClick={() => navigate("/projets/demineur")} 
                                    style={{ cursor: 'url(../images/Curseurs/curseurDemineur.png), auto', borderRadius: '10px'}}
                                />   
                            </div>                    
                        </Col>
                        <Col xs={4}>   
                            <div style={{width:'350px'}}>
                                <img 
                                    src="images/DeckCartes.png" 
                                    alt="Horloge" 
                                    onClick={() => navigate("/projets/horloge")} 
                                    style={{ cursor: 'url(../images/Curseurs/curseurAs.png), auto', borderRadius: '10px'}}
                                />   
                            <p className='mt-3'>Qui n'a jamais fait des jeux de patiences sur la table de la cuisine. Les cartes 
                                                étendues partout et au sol... Pourquoi ne pas essayer cette version numérique?</p>
                            <p className='d-flex justify-content-end'>Par Jennifer Marcotte</p>
                            </div>                  
                        </Col>
                    </Row>
                </div>
            ) : (
                <>
                    <p>Pour voir le contenu de cette page et de tout le site, veuillez vous connecter</p>
                    <Button variant='light'  onClick={() => loginWithRedirect()}>Se connecter</Button> 
                </>
            )}    
            </div>
        </div>
        
    )
}
