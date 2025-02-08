import { Demineur } from './Demineur';  
import { PageTemplate } from '../../PageTemplate';

export function PageDemineur(): JSX.Element {
  return (
    <PageTemplate title="Jeu Démineur" previous="/projets/yahtzee" nextPage="/projets/horloge">
      {<Demineur />}
    </PageTemplate>
  );
}
