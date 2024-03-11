import './index.css'

const CheckBoxItem = props => {
  const {checkBoxDetails, checkBoxChange} = props
  const {employmentTypeId, label} = checkBoxDetails

  const onChangeCheckBox = () => {
    checkBoxChange(employmentTypeId)
  }

  return (
    <li className="checkbox-container" key={employmentTypeId}>
      <input
        type="checkbox"
        className="checkbox-El"
        onChange={onChangeCheckBox}
        id={employmentTypeId}
      />
      <label className="checkbox-label" htmlFor={employmentTypeId}>
        {label}
      </label>
    </li>
  )
}

export default CheckBoxItem
