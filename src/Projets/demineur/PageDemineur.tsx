import { PageTemplate } from '../../PageTemplate';
import { App } from './App';  

export function PageDemineur(): JSX.Element {
  return (
    <PageTemplate title="Jeu Démineur" previous="/projets/yahtzee" nextPage="/projets/horloge">
      {<App />}
    </PageTemplate>
  );
}
