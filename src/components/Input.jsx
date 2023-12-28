// eslint-disable-next-line react/prop-types
export const Input = ({ label = "", type = 'text', required = false, name = "", value, onChange }) => {


    if(type === 'checkbox') {
        return (
            <>
                <label>{label}</label>
                <input type={type} required={required} name={name} checked={value} onChange={(e)=>onChange(e.target.checked)}/>
            </>
        )
    }

    return (
        <>
            <label>{label}</label>
            <input type={type} required={required} name={name} value={value} onChange={(e)=>onChange(e.target.value)}/>
        </>
    )
}

export default Input;