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
                if ((labelName !== "options" || this.state.showOptions) && this.props.values[labelName] !== null) {
                    /* Objects generally can't be children of html so stringify them */
                    /* Unless it's a special object created with JSX like "options" */
                    if ((typeof this.props.values[labelName] === 'object' && labelName !== "options")
                        || typeof this.props.values[labelName] === 'boolean') {
                        children.push(<td key={labelId}>{this.props.values[labelName].toString()}</td>);
                    } else {
                        children.push(<td key={labelId}>{this.props.values[labelName]}</td>);
                    }
                }
            }
        }

        return (<tr onMouseEnter={this.showOptions} onMouseLeave={this.hideOptions}>{children}</tr>);
    }
}

export default TableRow