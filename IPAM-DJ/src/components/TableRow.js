import React, {Component} from "react"


class TableRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showOptions: false
        };
    }

    showOptions = () => {
        this.setState({
                showOptions: true
            }
        )
    };

    hideOptions = () => {
        this.setState({
                showOptions: false
            }
        )
    };

    render() {
        let children = [];
        for (const labelId in this.props.labels) {
            if (this.props.labels.hasOwnProperty(labelId)) {
                const labelName = this.props.labels[labelId];
                /* expect the field "options" to contain on-hover menu elements */
                if (labelName !== "options" || this.state.showOptions) {
                    children.push(<td key={labelId}>{this.props.values[labelName]}</td>)
                }
            }
        }

        return (
            <tr onMouseEnter={this.showOptions} onMouseLeave={this.hideOptions}>{children}</tr>
        );
    }
}

export default TableRow