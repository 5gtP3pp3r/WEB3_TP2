import { Joueur as JoueurModel } from './models/Joueur';

interface JoueurProps {
  joueur: JoueurModel;
}

export function Joueur( props : JoueurProps){
  return (
    <div>
      <h3>{props.joueur.nom}</h3>
      <p>Score: {props.joueur.point}</p>
      <ul>
        {Object.entries(props.joueur.pointages).map(([category, score]) => (
          <li key={category}>
            {category}: {score !== null ? score : '-'}
          </li>
        ))}
      </ul>
    </div>
  );
};