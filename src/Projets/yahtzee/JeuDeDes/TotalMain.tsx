interface TotalMainProps {
    mainDes: number[]
}

export function TotalMains(props: TotalMainProps) {

    const total = props.mainDes.reduce((sum, valeur) => sum + valeur, 0);
    return (
        <h2>Total de la main: {total}</h2>
    )
}