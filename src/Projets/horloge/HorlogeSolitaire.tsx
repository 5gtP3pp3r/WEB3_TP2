import { useState, useEffect } from 'react';
import { Horloge, Paquet } from './Horloge';
import 'bootstrap/dist/css/bootstrap.min.css';

export function HorlogeSolitaire() {
    const [paquets, setPaquets] = useState<Paquet[]>([]); // contiendra les 13 paquets
    const nbPaquets: number = 13;
    const nbCartes: number = 4;

    useEffect(() => {
        // Je "fetch" un paquet (de 52 cartes) et"draw" les cartes du paquet dans la même requête.
        fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=52`)
            .then((reponse) => reponse.json())
            .then((donnees) => {
                const cartes = donnees.cards;
                const paquetsDivises: Paquet[] = []; // contiendra le tableau de paquets
                for (let i = 0; i < nbPaquets; i++) { // boucle 13 fois (une fois pas paquet)
                    paquetsDivises.push({ cartes: cartes.slice(i * nbCartes, (i + 1) * nbCartes) }); // A chaque iteration, on prend 4 cartes de la variable "cartes" avec slice() et on les "push" dans "paquetsDivises"
                }
                setPaquets(paquetsDivises); // On "set" le tableau de paquets "paquets" avec le tableau de 13 paquets "paquetsDivises"
            });

    }, []);

    return (
        <div >
            <h1 className="text-center">Horloge Solitaire</h1>
            {/* Envoi du tableau de paquets "paquets" en props au composant Horloge */}
            <Horloge paquets={paquets} />
        </div>
    );
}