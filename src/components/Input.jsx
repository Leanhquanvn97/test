// eslint-disable-next-line react/prop-types
export const Input = ({label="", type='text', required=false, name=""}) => {
    console.log(label)
    return(
        <>
            <label>{label}</label>
            <input type={type} required={required} name={name}/>
        </>
    )
}

export default Input;