import { PageTemplate } from '../../PageTemplate';
import { Yahtzee } from './Yahtzee';


export function PageYahtzee() {
  return (
    <PageTemplate title="Yahtzee!" previous="/projets/horloge" nextPage="/projets/demineur">
      {<Yahtzee/>}
    </PageTemplate>
  );
}
