import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import { INiveau } from './Niveau';
//import { niveauxTab } from './Niveau';

interface NiveauProps {
    niveaux: INiveau[];
    onNiveauSelect: (niveau: string) => void;
    niveauActif: string;
}

export function SelectionJeu({niveaux, onNiveauSelect, niveauActif}: NiveauProps) {
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
        </Form>
    );
}

