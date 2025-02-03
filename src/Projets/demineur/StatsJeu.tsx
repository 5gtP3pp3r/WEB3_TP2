
interface StatsJeuProps {
    temps: number;
    nbMine: number;
}

export function StatsJeu({ temps, nbMine }: StatsJeuProps): JSX.Element {   
    let minute  = Math.floor(temps / 60);   
    let secondeDizaine = temps % 60 < 0 ? 0 : Math.floor((temps % 60) / 10);
    let secondeUnite = temps % 10;
    const dizaine = Math.floor(nbMine / 10);
    const unite = nbMine % 10; 

    if (temps > 599) {
        minute = 8;
        secondeDizaine = 8;
        secondeUnite = 8;
    }

    return (
        <div className="d-flex justify-content-evenly mb-4">
            <div className="position-relative">
                <img src="../../images/demineur/nbMinesFond.png" alt="nbMinesFond" className="img-fluid"/>
                <div className="position-absolute top-50 start-50 translate-middle d-flex">
                    <img src={`../../images/demineur/digit${dizaine}.png`} alt="dizaine"  />
                    <img src={`../../images/demineur/digit${unite}.png`} alt="unite"/>
                </div>
            </div>
            <div className="position-relative">
                <img src="../../images/demineur/timerFond.png" alt="timerFond" className="img-fluid"/>
                <div className="position-absolute top-50 start-50 translate-middle d-flex">
                    <img src={`../../images/demineur/digit${minute}.png`} alt="minute" />
                    <img src="../../images/demineur/digitPts.png" alt=":" />
                    <img src={`../../images/demineur/digit${secondeDizaine}.png`} alt="seconde dizaine"/>
                    <img src={`../../images/demineur/digit${secondeUnite}.png`} alt="seconde unite" />
                </div>
            </div>        
        </div>
    );
}
