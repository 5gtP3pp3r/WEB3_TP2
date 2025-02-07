import { Button } from "react-bootstrap";

const imagesDes = [
    "/images/yahtzee/de1.png",
    "/images/yahtzee/de2.png",
    "/images/yahtzee/de3.png",
    "/images/yahtzee/de4.png",
    "/images/yahtzee/de5.png",
    "/images/yahtzee/de6.png",
];

interface DiceProps {
    value: number;
    isSelected: boolean;
    onClick: () => void;
}

export function Dice(props: DiceProps) {
    return (
        <Button
            variant={props.isSelected ? "success" : "outline-primary"}
            className="m-2"
            onClick={props.onClick}
        >
            <img src={imagesDes[props.value - 1]} alt={`Dé ${props.value}`} className="dice-image" />
        </Button>
    );
};
