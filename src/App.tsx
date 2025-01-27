import Container from 'react-bootstrap/Container';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router';
import { Header } from './Header';
import { NavBarre } from './NavBarre';
import { Footer } from './Footer';
import { Page404 } from './Page404';
import { PageAccueil } from './PageAccueil';

import { PageDemineur } from './Projets/demineur/PageDemineur';
import { PageHorloge } from './Projets/horloge/PageHorloge';
import { PageYahtzee } from './Projets/yahtzee/PageYahtzee';

export function App() {

  return (
    <BrowserRouter>
    <Header/>
    <NavBarre/>
    <Container>
      <Routes>
        <Route path="/" element={<PageAccueil />} />
        <Route path="projets/demineur" element={<PageDemineur />} />
        <Route path="projets/horloge" element={<PageHorloge />} />
        <Route path="projets/yahtzee" element={<PageYahtzee />} />
        <Route path="*" element={<Page404 />}/> 
      </Routes>
    </Container>
    <Footer/>
    </BrowserRouter>
  );
}
// Reste Auth0 à ajouter
