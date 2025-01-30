import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { INiveau } from './Niveau';
//import { niveauxTab } from './Niveau';

interface NiveauProps {
    niveaux: INiveau[];    
    niveauActif: string;
    onNiveauSelect: (niveau: string) => void;
    onLancerJeu: (niveau: INiveau) => void;
}

export function SelectionJeu({niveaux, niveauActif, onNiveauSelect, onLancerJeu}: NiveauProps, niveau: INiveau ) {
    return (
        <Form>
        <ListGroup>
            {niveaux.map((niveau) => (
                <ListGroup.Item
                    key={niveau.difficulte}
                    active={niveau.difficulte === niveauActif}
                    onClick={() => onNiveauSelect(niveau.difficulte)} 
                    style={{ cursor: 'pointer', width: '130px' }}
                    >
                    {niveau.difficulte}
                </ListGroup.Item>
            ))}
        </ListGroup>
            <Button
                className='mt-3'
                variant='light'
                onClick={() => onLancerJeu(niveau)}
                style={{ cursor: 'pointer', width: '130px' }}
                >Jouer!
            </Button>
        </Form>
    );
}

