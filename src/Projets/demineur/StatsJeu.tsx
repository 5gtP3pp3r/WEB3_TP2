
export function StatsJeu() {
    return (
        <div className="d-flex justify-content-evenly mb-4">
            <div className="position-relative">
                <img src="../../images/demineur/nbMinesFond.png" alt="nbMinesFond" className="img-fluid"/>
                <div className="position-absolute top-50 start-50 translate-middle d-flex">
                    <img src="../../images/demineur/digit1.png" alt="1" className="digit" />
                    <img src="../../images/demineur/digit2.png" alt="2" className="digit" />
                </div>
            </div>
            <div className="position-relative">
                <img src="../../images/demineur/timerFond.png" alt="timerFond" className="img-fluid"/>
                <div className="position-absolute top-50 start-50 translate-middle d-flex">
                    <img src="../../images/demineur/digit0.png" alt="0" className="digit" />
                    <img src="../../images/demineur/digitPts.png" alt=":" className="digit" />
                    <img src="../../images/demineur/digit1.png" alt="1" className="digit" />
                    <img src="../../images/demineur/digit2.png" alt="2" className="digit" />
                </div>
            </div>
        
        </div>
    )
}
