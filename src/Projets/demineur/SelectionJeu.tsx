import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { INiveau } from './INiveau';
//import { niveauxTab } from './Niveau';

interface NiveauProps {
    estJoueurActif: boolean;
    niveaux: INiveau[];    
    niveauActif: string;
    onNiveauSelect: (niveau: string) => void;
    onLancerJeu: (niveau: INiveau) => void;
}

export function SelectionJeu({estJoueurActif, niveaux, niveauActif, onNiveauSelect, onLancerJeu}: NiveauProps): JSX.Element {
    const niveau = niveaux.find(n => n.difficulte === niveauActif);
    const boutonDisabled: boolean = estJoueurActif ? true : false;
    return (
        <Form>
        <ListGroup>
            {niveaux.map((niveau) => (
                <ListGroup.Item
                    key={niveau.difficulte}
                    active={niveau.difficulte === niveauActif}
                    onClick={() => onNiveauSelect(niveau.difficulte)} 
                    style={{ cursor: 'pointer', width: '200px' }}
                    variant='light'
                    >
                    {niveau.difficulte}
                </ListGroup.Item>
            ))}
        </ListGroup>
            <div className='mt-3'>
            <h6>Lancer le jeu:</h6>
            <Button                
                variant='secondary'
                disabled={boutonDisabled}
                onClick={() =>{ if(niveau) onLancerJeu(niveau) }}    // if(niveau): enlevé soulignement "undefined possible"
                style={{ width: '200px', cursor: 'url(../../images/demineur/curseurDemineur.png), auto'}}
                >Jouer!
            </Button>
            </div>
        </Form>
    );
}
