import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { MainDes } from '../MainDes';
import { Statistiques } from './Statistiques';

export function JeuDeDes() {

    const [mainDes, setMainDes] = useState<number[]>(brasserMainAleatoire());

    function genererNombreAleatoire(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    function brasserMainAleatoire(): number[] {
        return [
            genererNombreAleatoire(1, 6),
            genererNombreAleatoire(1, 6),
            genererNombreAleatoire(1, 6),
            genererNombreAleatoire(1, 6),
            genererNombreAleatoire(1, 6)
        ]
    }

    function brasserDe(index: number) {
        const nouvelleMain = [...mainDes];
        nouvelleMain[index] = genererNombreAleatoire(1, 6);
        setMainDes(nouvelleMain);
    }

    return (
        <Container>
            <h1>
                Jeu de dés
                <Button
                    variant='warning'
                    className='m-1'
                    onClick={() => setMainDes(brasserMainAleatoire())}>
                    Brasser la main
                </Button>
            </h1>
            <strong>Cliquez sur l'image pour brasser un dé individuel</strong><br />
            <MainDes main={mainDes} handleClick={brasserDe} />
            <Statistiques mainDes={mainDes}/>
        </Container>
    );
}
export default JeuDeDes;