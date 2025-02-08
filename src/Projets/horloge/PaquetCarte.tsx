import './css/PaquetCarte.css';

export interface Carte { // Carte contient une image, qui est une string contenant lurl de l'image de la carte.
  code: string  
  image: string;
  estRevelee: boolean; // Ajout d'un etat pour verifier si la carte a ete revelee
};

interface PaquetCarteProps { 
  paquet: Carte[]; //  tableau de cartes
  index: number;  // representera la position du paquet dans lhorloge. utilise pour appliquer un rotation et espacer les paquets.
  indexCarteRevelee: number;
}

export function PaquetCarte(props: PaquetCarteProps) { // affiche un paquet de cartes sous form de piles ou chaque carte dun paquet est mis en cascade les unes les autres 
  const { paquet, index, indexCarteRevelee } = props;
  const angleRotation = index * 30;
  return (
    <div
      className="paquet"
      style={{
        transform: `rotate(${angleRotation}deg) translate(250px) rotate(-${angleRotation}deg)` // Jutilise transform pour faire trois transformation : une rotation de 30 degree pour que chaque paquet soit places en cercle autour du centre. en suite je fait un translate pour eloigner les paquets du centre et finalement une rotation negative pour quelle restent orientees correctement
      }}
    >
      {paquet.map((carte, carteIndex) => ( // Parcour chaque carte du paquet 
        <img
          key={carte.code}
          src= {(carteIndex === 0 && (index === indexCarteRevelee) || carte.estRevelee) ? carte.image : "https://deckofcardsapi.com/static/img/back.png"}
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
