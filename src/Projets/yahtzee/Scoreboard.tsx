import { Table } from "react-bootstrap";

interface ScoreboardProps {
    scores: { [key: string]: number | null };
}

export function Scoreboard(props: ScoreboardProps) {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Catégorie</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(props.scores).map(([category, score]) => (
                    <tr key={category}>
                        <td>{category}</td>
                        <td>{score !== null ? score : "-"}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};
