import { ListGroup, Form, Button } from 'react-bootstrap';
import { useState } from 'react';

import { INiveau } from './INiveau';

interface NiveauProps {
    estJoueurActif: boolean;
    niveaux: INiveau[];    
    niveauActif: string;
    onNiveauSelect: (niveau: string) => void;
    onLancerJeu: (niveau: INiveau) => void;
}

export function SelectionJeu({estJoueurActif, niveaux, niveauActif, onNiveauSelect, onLancerJeu}: NiveauProps): JSX.Element {
    const niveau = niveaux.find(n => n.difficulte === niveauActif);
    const [niveauChoisi, setNiveauChoisi] = useState(false);
    const boutonDisabled: boolean = (estJoueurActif || !niveauChoisi) ? true : false;

    return (
        <Form>
        <ListGroup>
            <h6> Choisir niveau:</h6>
            {niveaux.map((niveau) => (
                <ListGroup.Item
                    key={niveau.difficulte}
                    active={niveau.difficulte === niveauActif}
                    onClick={() => {onNiveauSelect(niveau.difficulte); setNiveauChoisi(true);}} 
                    style={{ cursor: 'pointer', width: '200px', borderRadius: '10px', border: '1px solid #ccc' }}
                    variant='light'                   
                >
                    {niveau.difficulte}
                </ListGroup.Item>
            ))}
        </ListGroup>
            <div className='mt-3 mb-5'>
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
