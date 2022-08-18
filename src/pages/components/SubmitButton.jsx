
const SubmitButton = ({value, disabled, onClick}) => {
  return (
    <input type="submit" disabled={disabled} value={disabled ? value[1] : value[0]} onClick={onClick}/>
  )
}

export default SubmitButton