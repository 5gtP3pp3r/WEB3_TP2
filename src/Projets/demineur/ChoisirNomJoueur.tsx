import { Form } from "react-bootstrap";
import { useState } from 'react';
import { FecthListeNomsApi } from "./FetchListeNomsApi";
import { IJoueur } from "./IJoueur";

interface JoueursProps {
    listeJoueurs: IJoueur[],
    setJoueur: (joueurActif: IJoueur) => void;
    setListeJoueurs: (joueurs: IJoueur[]) => void;
}

export function ChoisirNomJoueur({ listeJoueurs, setJoueur, setListeJoueurs }: JoueursProps) {
    const [listeNomsApi, setListeNomsApi] = useState<string[]>([]);
    const [nomJoueur, setNomJoueur] = useState<string>("");

    async function chargerListe() {
        if (listeNomsApi.length > 0) {
            console.log("Liste déjà chargée !");
            return;
        }
        const listeNoms = await RemplirListeJoueurs();
        setListeNomsApi(listeNoms);
    }

    async function RemplirListeJoueurs(): Promise<string[]> {
        try {
            const donnees = await FecthListeNomsApi();
            return donnees.map((element: { name: string }) => element.name);
        } catch (error) {
            console.error("Erreur Fetch :", error);
            alert("Impossible de récupérer la liste de noms");
            return [];
        }
    }

    function handleSelection(nom: string) {
        setNomJoueur(nom);
        const joueurActif: IJoueur = {
            nom: nom,
            niveau: "none",
            points: 0
        };
        setJoueur(joueurActif);
        if (!listeJoueurs.some(liste => liste.nom === nom)) {
            setListeJoueurs([...listeJoueurs, joueurActif]);
        }
        console.log("Stats Joueur Actif fraichement choisi (sans niveau ou pointage associé):");
        console.log(joueurActif.nom);
        console.log(joueurActif.niveau);
        console.log(joueurActif.points);
    }

    return (
        <div>
            <Form>
                <Form.Group>
                    <Form.Control 
                        className='mt-2'  
                        style={{width:'200px'}}                      
                        as="select" 
                        value={nomJoueur} 
                        onMouseOver={chargerListe}
                        onChange={(e) => handleSelection(e.target.value)}
                    >
                        <option value="">Joueurs</option>
                        {listeNomsApi.map((nom, index) => (
                            <option key={index} value={nom}>{nom}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
            </Form>
        </div>
    );
}

























/*
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { INiveau } from './Niveau';
//import { niveauxTab } from './Niveau';

interface NiveauProps {
    niveaux: INiveau[];    
    niveauActif: string;
    onNiveauSelect: (niveau: string) => void;

}

export function SelectionJeu({niveaux, niveauActif, onNiveauSelect, onLancerJeu}: NiveauProps): JSX.Element {
    const niveau = niveaux.find(n => n.difficulte === niveauActif);

    return (
        <Form>
        <ListGroup>
            {niveaux.map((niveau) => (
                <ListGroup.Item
                    key={niveau.difficulte}
                    active={niveau.difficulte === niveauActif}
                    onClick={() => onNiveauSelect(niveau.difficulte)} 
                    style={{ cursor: 'pointer', width: '130px' }}
                    variant='light'
                    >
                    {niveau.difficulte}
                </ListGroup.Item>
            ))}
        </ListGroup>
            <Button
                className='mt-3'
                variant='secondary'
                onClick={() =>{ if(niveau) onLancerJeu(niveau) }}    // if(niveau): enlevé soulignement "undefined possible"
                style={{ width: '130px', cursor: 'url(../../images/demineur/curseurDemineur.png), auto'}}
                >Jouer!
            </Button>
        </Form>
    );
}
*/