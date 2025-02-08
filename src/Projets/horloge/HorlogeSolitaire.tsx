import { useState, useEffect } from 'react';
import { Horloge, Paquet } from './Horloge';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ResultatPartie } from './ResultatPartie';
import { Carte } from './PaquetCarte';

export function HorlogeSolitaire() {
    const [paquets, setPaquets] = useState<Paquet[]>([]);                                       // contiendra les 13 paquets.
    const [estEnChargement, setEstEnChargement] = useState<boolean>(true);
    const [indexCarteRevelee, setIndexCarteRevelee] = useState<number>(12);                     // par défaut, la première carte révélée est celle du paquet du centre.
    const [estPartieGagnee, setEsPartieGagnee] = useState<boolean>(false);                       // props du composant ResultatPartie pour verifier l'état du jeu.
    const [estPartiePerdue, setEsPartiePerdue] = useState<boolean>(false);

    const tableauHeures: number[] = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 0];                             // Ce tableau représente l'heure du paquet selon son index. Par exemple, le paquet à la position 3 heures à un index de 0.
    const nbPaquets: number = 13;
    const nbCartes: number = 4;
    const indexPaquetCentre: number = 12;
    const roi: string = "K";
    const dame: string = "Q";
    const valet: string = "J";
    const as: string = "A";
    const dix = "0";

    function verifierEtatPartie() {
        const paquetCentrale = paquets[12];
        const roi: string = "K";
        const paquetsDesHeures = paquets.slice(0, 12);
        const aToutLesRoisPaquetCentre: boolean = paquetCentrale.cartes.every(carte => carte.code.substring(0, 1) === roi);
        const aToutesLesCartesHeuresRevelee: boolean = paquetsDesHeures.every(paquet => paquet.cartes.every(carte => carte.estRevelee));

        if (aToutLesRoisPaquetCentre && paquetCentrale.cartes.length==nbCartes && !aToutesLesCartesHeuresRevelee) {
            setEsPartiePerdue(true);
        } else if (aToutLesRoisPaquetCentre && aToutesLesCartesHeuresRevelee) {
            setEsPartieGagnee(true);
        }
    }

    function convertiCodeEnHeure(codeCarteCentrale: string): number {
        const numeroCarte: string = codeCarteCentrale.substring(0, 1);
        switch (numeroCarte) {
            case dix:
                return 10;
            case as:
                return 1;
            case valet:
                return 11;
            case dame:
                return 12;
            case roi:
                return 0;
            default:
                return parseInt(numeroCarte);
        }
    }

    const handlePaquetClick = (indexPaquetClique: number) => {
        console.log("Variable index paquetClique:" + indexPaquetClique);
        let heurePaquetClique: number = tableauHeures[indexPaquetClique];
        console.log("Variable heurePaquetClique:" + heurePaquetClique);
        const heureCarteRevelee: number = convertiCodeEnHeure(paquets[indexCarteRevelee].cartes[0].code);

        if (heurePaquetClique === heureCarteRevelee) {
            const nouveauxPaquets: Paquet[] = [...paquets]                                      // copie du tableau de paquet en utilisant la décomposition.
            const carteRevelee = { ...paquets[indexCarteRevelee].cartes[0], estRevelee: true };

            nouveauxPaquets[indexPaquetClique].cartes.push(carteRevelee);                       // Déplace la carte révélée au paquet à la position de son heure.
            nouveauxPaquets[indexCarteRevelee].cartes.shift();                                  // Enleve la carte révélée du paquet d'origine.
            setPaquets(nouveauxPaquets);

            if (heurePaquetClique == 15) {
                setIndexCarteRevelee(indexPaquetCentre);
            }
            setIndexCarteRevelee(indexPaquetClique);                                            //On met à jour lindex du paquet de la carte qui sera maintenant révélée.
            verifierEtatPartie();
        }
    }

    useEffect(() => {
        fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=52`)                         // Je "fetch" un paquet (de 52 cartes) et "draw" les cartes du paquet dans la même requête.
            .then((reponse) => reponse.json())
            .then((donnees) => {
                const cartes: Carte[] = donnees.cards;
                const paquetsDivises: Paquet[] = [];                                            // contiendra le tableau de paquets.À chaque itération, on prend 4 cartes de la variable "cartes" avec slice() et on les "push" dans "paquetsDivises".
                for (let i = 0; i < nbPaquets; i++) {                                           // boucle 13 fois (une fois pas paquet).
                    paquetsDivises.push({
                        cartes: cartes.slice(i * nbCartes, (i + 1) * nbCartes).map((carte: Carte, index: number) => ({
                            ...carte,
                            estRevelee: i === indexPaquetCentre && index === 0                  // Initialise la première carte du paquet du centre comme étant la seule à être révélée au début du jeu.
                        }))
                    });
                }
                setPaquets(paquetsDivises);                                                     // On "set" le tableau de paquets "paquets" avec le tableau de 13 paquets "paquetsDivises".
                setEstEnChargement(false);
            });

    }, []);

    return (
        <div className='d-flex justify-content-center' style={{ height: '600px' }}>
            {/* Envoi du tableau de paquets "paquets" en props au composant Horloge.*/}
            {estEnChargement ? (
                <p>Chargement du jeu...</p>
            ) : (
                <>
                    <Horloge paquets={paquets} onClickPaquet={handlePaquetClick} indexCarteRevelee={indexCarteRevelee} />
                    <ResultatPartie estGagnee={estPartieGagnee} estPerdue={estPartiePerdue} />
                </>
            )}
        </div>
    );
}