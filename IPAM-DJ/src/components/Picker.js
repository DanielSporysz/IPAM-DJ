import React from 'react'
import PropTypes from 'prop-types'

const Picker = ({name, value, onChange, options}) => (
    <select onChange={e => onChange(e)}
            value={value} name={name}>
      {options.map(option =>
          <option value={option} key={option}>
              {option}
          </option>)
      }
    </select>
);

Picker.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.string.isRequired
    ).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
};

export default Picker