import { PageTemplate } from '../../PageTemplate';
import { App } from './App';  

export function PageYahtzee() {
  return (
    <PageTemplate title="Jeu Yahtzee" previous="/projets/horloge" nextPage="/projets/demineur">
      {<App />}
    </PageTemplate>
  );
}
