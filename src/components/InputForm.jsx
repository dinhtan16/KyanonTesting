import React from 'react'
import './styles/input.scss'
const InputForm = ({type,name,value,onChange,defaultValue,inputInvalids,setInputInvalids,keyPayload}) => {
    // console.log(inputInvalids)
  return (
   <>
        <input defaultValue={defaultValue} onFocus={() => setInputInvalids([])} name={name} type={type} value={value} onChange={onChange}/>
        {/* {inputInvalids?.length > 0 &&
            inputInvalids?.some((item) => item.name === 'password') && (
              <small
                style={{
                  color: "red",
                  fontStyle: "italic",
                  margin: "5px 0",
                }}
              >
                {
                  inputInvalids?.find((item) => item.name === 'password')
                    ?.msg
                }
              </small>
            )} */}
   </>
  )
}

export default InputForm