import { PageTemplate } from '../../PageTemplate';
import { Demineur } from './Demineur';  

export function PageDemineur(): JSX.Element {
  return (
    <PageTemplate title="Jeu Démineur" previous="/projets/yahtzee" nextPage="/projets/horloge">
      {<Demineur />}
    </PageTemplate>
  );
}
