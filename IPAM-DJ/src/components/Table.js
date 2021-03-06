import React from "react"

import TableRow from "./TableRow";

function Table(props) {
    const table_labels = props.labels.map((value) => {
        /* do not display "options" label as options are only visible when user hovers over the row */
        if (value !== "options") {
            return <th key={value}>{value.toUpperCase()}</th>
        } else {
            return null;
        }
    });

    const table_body = [];
    for (const itemId in props.items) {
        if (props.items.hasOwnProperty(itemId)) {
            table_body.push(<TableRow key={itemId} values={props.items[itemId]} labels={props.labels}/>);
        }
    }

    return <div className="Table">
        <table>
            <thead>
            <tr>{table_labels}<th className="options"></th></tr>
            </thead>
            <tbody>{table_body}</tbody>
        </table>
    </div>
}

export default Table