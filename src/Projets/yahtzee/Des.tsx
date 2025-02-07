import { Des as DesModel } from './models/Des';
import { Button } from 'react-bootstrap';

interface DesProps {
    value: DesModel['valeur'];
    isKept: DesModel['estGarder'];
    onClick: () => void;
}

export function Des(props: DesProps) {
    return (
        <Button
            variant={props.isKept ? 'success' : 'primary'}
            onClick={props.onClick}
        >
            {props.value}
        </Button>
    );
};