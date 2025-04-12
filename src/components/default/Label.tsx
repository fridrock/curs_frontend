
interface LabelProps{
    name: string
}

export default function Label(props: LabelProps){
    const styles = {
        fontFamily: "InstrumentSans, sans-serif",
        color: "#555555",
        fontSize: "1vw",
        marginTop:"1vw"
    }
    return <>
        <label style={styles}>{props.name}</label>
    </>
}