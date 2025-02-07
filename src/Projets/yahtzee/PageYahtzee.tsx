import { PageTemplate } from '../../PageTemplate';
import { Game } from './Game';


export function PageYahtzee() {
  return (
    <PageTemplate title="Yahtzee!" previous="/projets/horloge" nextPage="/projets/demineur">
      {<Game/>}
    </PageTemplate>
  );
}
