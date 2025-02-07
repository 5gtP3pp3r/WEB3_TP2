import { useEffect, useState } from "react";
import { Dice } from "./Dice";
import { Scoreboard } from "./Scoreboard";
import { Button, Container, Row, Col, Dropdown, Table } from "react-bootstrap";
import { calculateScore } from "./score";

const categoriesHaut = ["As", "Deux", "Trois", "Quatre", "Cinq", "Six"];
const categoriesBas = ["Brelan", "Carré", "Full House", "Petite suite", "Grande suite", "Yahtzee", "Chance"];

export function Yahtzee() {

    function genererNombreAleatoire(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    const [diceValues, setDiceValues] = useState<number[]>([
        genererNombreAleatoire(1, 6),
        genererNombreAleatoire(1, 6),
        genererNombreAleatoire(1, 6),
        genererNombreAleatoire(1, 6),
        genererNombreAleatoire(1, 6)]);
        
    const [selectedDice, setSelectedDice] = useState<boolean[]>([false, false, false, false, false]);
    const [rollsLeft, setRollsLeft] = useState(3);
    const [joueurActif, setJoueurActif] = useState(0);
    const [nombreJoueurs, setNombreJoueurs] = useState<number | null>(null);
    const [partieTerminee, setPartieTerminee] = useState(false);
    const [scores, setScores] = useState<Array<{ [key: string]: number | null }>>([]);
    const [leaderboard, setLeaderboard] = useState<{ name: string; score: number }[]>([]);
    const [nouveauJoueur, setNouveauJoueur] = useState("");

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(data => {
                const joueursFictifs = data.map((user: any) => ({
                    name: user.name,
                    score: Math.floor(Math.random() * 300) + 100,
                }));
                setLeaderboard(joueursFictifs);
            })
            .catch(error => console.error("Erreur lors du fetch:", error));
    }, []);

    const initialiserPartie = (nbJoueurs: number) => {
        setNombreJoueurs(nbJoueurs);
        setScores(
            Array(nbJoueurs)
                .fill(null)
                .map(() =>
                    Object.fromEntries([...categoriesHaut, ...categoriesBas].map(cat => [cat, null]))
                )
        );
        setPartieTerminee(false);
        setJoueurActif(0);
    };

    const rollDice = () => {
        if (rollsLeft > 0) {
            setDiceValues(diceValues.map((val, i) => (selectedDice[i] ? val : Math.floor(Math.random() * 6) + 1)));
            setRollsLeft(rollsLeft - 1);
        }
    };

    const toggleDice = (index: number) => {
        const newSelected = [...selectedDice];
        newSelected[index] = !newSelected[index];
        setSelectedDice(newSelected);
    };

    const chooseCategory = (category: string) => {

        if (scores[joueurActif][category] === null) {
            let score = calculateScore(diceValues, category);

            let newScores = [...scores];
            newScores[joueurActif] = { ...newScores[joueurActif], [category]: score };

            setScores(newScores);
            setRollsLeft(3);
            setDiceValues([
                genererNombreAleatoire(1, 6),
                genererNombreAleatoire(1, 6),
                genererNombreAleatoire(1, 6),
                genererNombreAleatoire(1, 6),
                genererNombreAleatoire(1, 6)]);
            setSelectedDice([false, false, false, false, false]);

            const isGameOver = newScores.every(scoreboard =>
                [...categoriesHaut, ...categoriesBas].every(cat => scoreboard[cat] !== null)
            );

            if (isGameOver) {
                setPartieTerminee(true);
                return;
            }

            setJoueurActif((joueurActif + 1) % nombreJoueurs!);
        }
    };



    const totalHaut = scores.map(score =>
        categoriesHaut.reduce((sum, cat) => sum + (score[cat] || 0), 0)
    );
    const bonus = totalHaut.map(total => (total >= 63 ? 35 : 0));
    const totalBas = scores.map(score =>
        categoriesBas.reduce((sum, cat) => sum + (score[cat] || 0), 0)
    );
    const totalGeneral = scores.map((_, index) => totalHaut[index] + bonus[index] + totalBas[index]);

    if (nombreJoueurs === null) {
        return (
            <Container className="text-center mt-4">
                <h1>Sélectionnez le nombre de joueurs</h1>
                {[1, 2, 3, 4].map(num => (
                    <Button key={num} className="m-2" onClick={() => initialiserPartie(num)}>
                        {num} Joueur{num > 1 ? "s" : ""}
                    </Button>
                ))}
            </Container>
        );
    }

    if (partieTerminee) {

        const classement = scores
            .map((_, index) => ({ joueur: index + 1, score: totalGeneral[index] }))
            .sort((a, b) => b.score - a.score);

        const ajouterGagnant = () => {
            if (nouveauJoueur.trim() !== "") {
                setLeaderboard([...leaderboard, { name: nouveauJoueur, score: classement[0].score }]);
                setNouveauJoueur("");
            }
        };

        return (
            <Container className="text-center mt-4">
                <h1>Partie Terminée!</h1>
                <h4>Le gagnant est Joueur {classement[0].joueur} avec {classement[0].score} points!</h4>
                <h3>Ajouter le gagnant :</h3>
                <input
                    type="text"
                    value={nouveauJoueur}
                    onChange={(e) => setNouveauJoueur(e.target.value)}
                    placeholder="Nom du gagnant"
                    className="form-control"
                />
                <Button className="mt-4" onClick={ajouterGagnant}>Ajouter au leaderboard</Button>

                <Table striped bordered className="mt-4">
                    <thead>
                        <tr>
                            <th colSpan={3}><h3>Leaderboard</h3></th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboard
                            .sort((a, b) => b.score - a.score)
                            .map((entry, index) => (
                                <tr>
                                    <td key={index}>{index + 1}</td>
                                    <td>{entry.name}</td>
                                    <td>{entry.score} points</td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
                <Button className="mt-3" onClick={() => setNombreJoueurs(null)}>Rejouer</Button>
            </Container>
        );
    }

    return (
        <Container className="text-center mt-4">
            <h1>Yahtzee! - Joueur {joueurActif + 1} </h1>

            <Row>
                <Col>
                    {diceValues.map((val, i) => (
                        <Dice key={i} value={val} isSelected={selectedDice[i]} onClick={() => toggleDice(i)} />
                    ))}
                </Col>
            </Row>

            <Button onClick={rollDice} disabled={rollsLeft === 0} className="mt-3">
                Lancer ({rollsLeft} restants)
            </Button>

            <h3 className="mt-4">Choisissez une catégorie :</h3>
            <Dropdown className="mb-3">
                <Dropdown.Toggle variant="primary">Section Haute</Dropdown.Toggle>
                <Dropdown.Menu>
                    {categoriesHaut.map(category => (
                        <Dropdown.Item key={category} onClick={() => chooseCategory(category)} disabled={scores[joueurActif][category] !== null}>
                            {category}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown className="mb-3">
                <Dropdown.Toggle variant="secondary">Section Basse</Dropdown.Toggle>
                <Dropdown.Menu>
                    {categoriesBas.map(category => (
                        <Dropdown.Item key={category} onClick={() => chooseCategory(category)} disabled={scores[joueurActif][category] !== null}>
                            {category}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>

            <h2 className="mt-4">Score Total : {totalGeneral[joueurActif]}</h2>

            <h3 className="mt-4">Scores des joueurs :</h3>
            <Row>
                {scores.map((score, index) => (
                    <Col key={index} className={joueurActif === index ? "fw-bold text-primary mb-4" : ""}>
                        Joueur {index + 1} : {totalGeneral[index]} points
                    </Col>
                ))}
            </Row>

            <Scoreboard scores={{ ...scores[joueurActif], "Bonus Haute": bonus[joueurActif], "Score Total": totalGeneral[joueurActif] }} />
        </Container>
    );
};
