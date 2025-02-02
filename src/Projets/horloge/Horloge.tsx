import { PaquetCarte, Carte } from './PaquetCarte';
import './css/Horloge.css';

export interface Paquet { // Un paquet est un tableau de cartes
  cartes: Carte[];
}

interface HorlogeProps {
  paquets: Paquet[];
}

export function Horloge(props: HorlogeProps) {
  const { paquets } = props;

  return (
    <div className="divHorloge">
      <div className="horloge">
        {paquets.slice(0, 12).map((paquet, index) => (
          <PaquetCarte key={index} paquet={paquet.cartes} index={index} />
        ))}

        {/* Je gere le paquet de carte qui sera au centre dans une div appart */}
        <div className="paquetDuCentre">
          {paquets[12]?.cartes.map((carte, carteIndex) => (
            <img
              key={carte.code}
              src={carteIndex === 0 ? carte.image : "https://deckofcardsapi.com/static/img/back.png"}
              alt={`Carte centrale ${carte.code}`}
              className="dos_carte"
              style={{
                zIndex: paquets[12].cartes.length - carteIndex,  // jutilise zIndex pour empiler les cartes en cascade : https://developer.mozilla.org/fr/docs/Web/CSS/z-index
                top: `${carteIndex * 8}px`,  // Décalage vertical des cartes
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
