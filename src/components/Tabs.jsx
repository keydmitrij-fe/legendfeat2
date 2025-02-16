import "./Tabs.css"

export default function Tabs(props) {

    return (
        <button onClick={props.onSelect} className="tab">{props.title}</button>
    );
}
