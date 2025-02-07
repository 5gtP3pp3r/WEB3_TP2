import './css/PaquetCarte.css';

export interface Carte { // Carte contient une image, qui est une string contenant lurl de l'image de la carte.
  code: string  
  image: string;
};

interface PaquetCarteProps { 
  paquet: Carte[]; //  tableau de cartes
  index: number;  // representera la position du paquet dans lhorloge. utilise pour appliquer un rotation et espacer les paquets.
  indexCarteRevelee: number;
}

export function PaquetCarte(props: PaquetCarteProps) { // affiche un paquet de cartes sous form de piles ou chaque carte dun paquet est mis en cascade les unes les autres 
  const { paquet, index, indexCarteRevelee } = props;

  return (
    <div
      className="paquet"
      style={{
        transform: `rotate(${index * 30}deg) translate(200px) rotate(-${index * 30}deg)`, // Chaque paquet est tourne avec un rotate positif selon son index, ca les repartit de maniere circulaire autour du centre. translate eloigne chaque paquet du centre. le rotate negatif applique une rotation inverse pour sassurer que les cartes reste orientees correctement. 
      }}
    >
      {paquet.map((carte, carteIndex) => ( // Parcour chaque carte du paquet 
        <img
          key={carte.code}
          src= {carteIndex === 0 && index === indexCarteRevelee ? carte.image : "https://deckofcardsapi.com/static/img/back.png"}
          alt={`Carte ${carte.code}`}
          className="dos_carte"
          style={{
            zIndex: paquet.length - carteIndex,  // zIndex me permet dempiler en cascade les cartes de chaque paquets : https://developer.mozilla.org/fr/docs/Web/CSS/z-index
            top: `${carteIndex * 8}px`, // top permet de decaler verticalement les cartes. 
          }}
        />
      ))}
    </div>
  );
}
