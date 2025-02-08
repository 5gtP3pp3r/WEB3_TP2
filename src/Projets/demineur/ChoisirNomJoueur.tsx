import { Form } from "react-bootstrap";
import { useState } from 'react';

import { IJoueur } from "./IJoueur";
import { FecthListeNomsApi } from "./FetchListeNomsApi";

interface JoueursProps {
    listeJoueurs: IJoueur[],
    setJoueur: (joueurActif: IJoueur) => void;
}

export function ChoisirNomJoueur({ setJoueur }: JoueursProps) {
    const [listeNomsApi, setListeNomsApi] = useState<string[]>([]);
    const [nomJoueur, setNomJoueur] = useState<string>("");

    async function chargerListe() {
        if (listeNomsApi.length > 0) {
            /**********  Diag tests **********/
            /**/console.log("Liste déjà chargée !");
            /*********************************/
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
            /**********  Diag tests **********/
            /**/console.error("Erreur Fetch :", error);
            /**/alert("Impossible de récupérer la liste de noms");
            /*********************************/

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
        /**********  Diag tests **********/
        /**/console.log("Stats Joueur Actif fraichement choisi (sans niveau ou pointage associé):");
        /**/console.log(joueurActif.nom);
        /**/console.log(joueurActif.niveau);
        /**/console.log(joueurActif.points);
        /*********************************/
    }

    return (
        <div>
            <Form>
            <h6>Choisir/Changer joueur:</h6>
                <Form.Group>
                    <Form.Control 
                        className='mt-2'  
                        style={{width:'200px', boxShadow: 'none', border: '1px solid #ccc'}}                      
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
