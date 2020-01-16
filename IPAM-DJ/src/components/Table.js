import React from "react"

function Table(props) {
    const table_labels = props.labels.map((key, index) => {
        return <th key={index}>{key.toUpperCase()}</th>
    });

    const table_body = [];
    for (const itemId in props.items) {
        if (props.items.hasOwnProperty(itemId)){
            let children = [];
            for (const labelId in props.labels) {
                if (props.labels.hasOwnProperty(labelId)) {
                    let label = props.labels[labelId];
                    if (props.items[itemId].hasOwnProperty(label)) {
                        children.push(<td key={labelId}>{props.items[itemId][label]}</td>)
                    }
                }
            }
            table_body.push(<tr key={itemId}>{children}</tr>);
        }
    }

    return <div>
        <table>
            <thead>
            <tr>{table_labels}</tr>
            </thead>
            <tbody>{table_body}</tbody>
        </table>
    </div>
}


export default Table