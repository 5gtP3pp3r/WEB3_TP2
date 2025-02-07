import { useState, useEffect } from 'react';
import { Horloge, Paquet } from './Horloge';
import 'bootstrap/dist/css/bootstrap.min.css';

export function HorlogeSolitaire() {
    const [paquets, setPaquets] = useState<Paquet[]>([]); // contiendra les 13 paquets
    const [estEnChargement,setEstEnChargement] = useState(true);
    const [indexCarteRevelee,setIndexCarteRevelee] = useState<number>(12); // par defaut, la premiere carte revelee est celle du paquet du centre
    const nbPaquets: number = 13;
    const nbCartes: number = 4;

    function convertiCodeEnHeure(codeCarteCentrale: string): number {
        const numeroCarte = codeCarteCentrale.substring(0,1);
        switch(numeroCarte) {
            case "0":
                return 10;
            case "A":
                return 1;
            case "J": 
                return 11;
            case "Q":
                return 12;
            case "K":
                return 15;
            default:
                return parseInt(numeroCarte);
        }
    }

    const handlePaquetClick = (indexPaquetClique: number) => {
        let heurePaquetClique = indexPaquetClique + 3
        if(heurePaquetClique == 13) {
            heurePaquetClique = 1;
        } else if(heurePaquetClique == 14) {
            heurePaquetClique = 2;
        }
        console.log("Index de la carte revelee:" + indexCarteRevelee);
        console.log("Index du paquet clique :" +heurePaquetClique);
        
        const heureCarteRevelee = convertiCodeEnHeure(paquets[indexCarteRevelee].cartes[0].code);
        console.log("heureCarteRevelee:" + heureCarteRevelee);

        if(heurePaquetClique === heureCarteRevelee) {
            const nouveauxPaquets = [...paquets] // copie du tableau de paquet en utilisant la decomposition
            nouveauxPaquets[heurePaquetClique].cartes.push(paquets[indexCarteRevelee].cartes[0]); // Met la carte revelee au dernier index du paquet clique.
            nouveauxPaquets[indexCarteRevelee].cartes.shift();          // Enleve la carte revelee du paquet dorigine.
            setPaquets(nouveauxPaquets);
            if(heurePaquetClique == 15) {
                setIndexCarteRevelee(12);
            }
            setIndexCarteRevelee(indexPaquetClique);            //On met a jour lindex du paquet de la carte qui sera maintenant revelee.

            console.log(`Le paquet a l'heure ${heurePaquetClique} est egale a lheure de la carte revelee ${heureCarteRevelee}!`);
        }
        else{
            console.log(`Le paquet a l'heure ${heurePaquetClique} nest pas egale a lheure de la carte revelee ${heureCarteRevelee}!`);
        }
    }
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
                setEstEnChargement(false);
            });

    }, []);

    return (
        <div>
            {/* Envoi du tableau de paquets "paquets" en props au composant Horloge */}
            {estEnChargement ? <p>Chargement du jeu...</p> : <Horloge paquets={paquets} onClickPaquet={handlePaquetClick} indexCarteRevelee={indexCarteRevelee} />} 
        </div>
    );
}