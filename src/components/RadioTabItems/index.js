import './index.css'

const RadioTabItem = props => {
  const {radioTabDetails, changeRadioTab} = props
  const {salaryRangeId, label} = radioTabDetails

  const onChangeRadio = () => {
    changeRadioTab(salaryRangeId)
  }

  return (
    <li className="checkbox-container" key={salaryRangeId}>
      <input
        type="radio"
        id={salaryRangeId}
        className="checkbox-El"
        name="option"
        onChange={onChangeRadio}
      />
      <label className="checkbox-label" htmlFor={salaryRangeId}>
        {label}
      </label>
    </li>
  )
}

export default RadioTabItem
