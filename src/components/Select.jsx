/* eslint-disable react/prop-types */
const DisplayHierarchy = ({ category }) => {
    const generateElements = (initialStack) => {
        const elements = [];
        const stack = [...initialStack];

        while (stack.length > 0) {
            const { category, layer } = stack.pop();
            const margin = `${layer * 12}px`;

            elements.push(
                <option
                    key={category.name + category.id + stack.length}
                    className={`layer-${layer}`}
                    value={category.id}
                    style={{ marginInlineStart: margin }}
                >
                    {category.name}
                </option>
            );

            if (category.children) {
                stack.push(
                    ...Object.values(category.children).map(child => ({ category: child, layer: layer + 1 }))
                );
            }
        }

        return elements;
    };

    const elements = generateElements([{ category, layer: 0 }]);

    return elements;
};

export const Select = ({ data, label, required = false, value='1', onChange }) => {
    if (!Object.keys(data).length) {
        return null;
    }

    const dataKeys = Object.keys(data).filter((_, index) => index !== Object.keys(data).length - 1);

    return (
        <>
            <label>{label}</label>
            <select size={5} required={required} name="sector" value={value} onChange={(e)=>onChange(e.target.value)}>
                {dataKeys.map(key => {
                    return <DisplayHierarchy key={key} category={data[key]} />
                })}
            </select>
        </>
    )
}

export default Select;