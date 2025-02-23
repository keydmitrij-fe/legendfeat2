import "./Tabs.css"

export default function Tabs({...props}) {
    return (
    <button onClick={props.onSelect} className={props.highlight}>{props.title} ({props.quant})</button>
    );
}
