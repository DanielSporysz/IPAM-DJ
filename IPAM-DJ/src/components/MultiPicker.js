import React, {Component} from 'react'
import PropTypes from 'prop-types'

class MultiPicker extends Component {
    static propTypes = {
        options: PropTypes.arrayOf(
            PropTypes.string.isRequired
        ).isRequired,
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        name: PropTypes.string.isRequired
    };

    importValues = () => {
        let count = 0;
        let values = [];
        try {
            const valuesArray = JSON.parse(this.props.value);
            for (const field in valuesArray) {
                if (valuesArray.hasOwnProperty(field)) {
                    values.push(valuesArray[field]);
                    count++;
                }
            }
        } catch (e) {
            console.log("Couldn't import values from props.")
        }

        if (values[count] !== "") {
            values.push("");
        }

        return values;
    };

    handleChange = (e) => {
        let values = this.importValues();

        values[e.target.name] = e.target.value;

        values = values.filter(value => value !== "");

        const newValueAsAWhole = {
            target: {
                value: JSON.stringify(values),
                type: "list",
                name: this.props.name
            }
        };

        this.props.onChange(newValueAsAWhole)
    };

    render() {
        const values = this.importValues();

        let pickers = [];
        for (const idx in values) {
            if (values.hasOwnProperty(idx)) {
                pickers.push(
                    <select
                        onChange={e => this.handleChange(e)}
                        value={values[idx]}
                        name={idx}
                        key={idx}
                    >
                        {this.props.options
                            .filter(value => ((!values.includes(value) && value !== values[idx]) || value === values[idx] || value === ""))
                            .map(
                            option =>
                                <option value={option} key={option}>
                                    {option}
                                </option>)
                        }
                    </select>
                );
            }
        }


        return (
            <div>
                {pickers}
            </div>
        );
    }
}

export default MultiPicker