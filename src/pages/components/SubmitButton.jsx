import { useState } from "react"

const SubmitButton = ({value, disabled=false}) => {
    const [clicked, setClicked] = useState(false);
  return (
    <input type="submit" disabled={disabled} value={value} onClick={() => setClicked(!clicked)}/>
  )
}

export default SubmitButton