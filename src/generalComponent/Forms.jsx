import { useState } from "react";

const Forms = ({ children, onSubmit, className, ...rest }) => {
    const exSubmit = e => {
        e.preventDefault();
        // console.log(e);
        let list = []
        for (let index = 0; index < e.target.children.length; index++) {
            const element = e.target.children[index];
            if (element.name)
                list.push({ [element.name]: element.value })
        }
        onSubmit(list)
    }
    return (
        <form  {...rest} onSubmit={exSubmit} className={className}>
            {children}
        </form>
    );
}


const Input = ({ placeholder = "", onChange, name, type, className, ...rest }) => {
    return (
        <input {...rest} name={name} onChange={onChange} placeholder={placeholder} className={className} type={type} />
    );
}

const Select = ({ children = [], name, placeholder = "", onChange, inputClassName, className, ...rest }) => {
    const [selected, setSelected] = useState({ value: "", text: "" });
    const [searchStr, setSearchStr] = useState("");
    Select.data = { value: selected, setValue: setSelected, setSearchStr, onChange }
    console.log("children", children);
    const filtered = children.filter(v => v.props.children.toLowerCase().indexOf(searchStr.toLowerCase()))
        .sort((a, b) => a.props.children.toLowerCase().indexOf(searchStr.toLowerCase()) - b.props.children.toLowerCase().indexOf(searchStr.toLowerCase()));
    console.log("filtered", filtered.map(d => d.props));
    // const filtered=children.indexOf(Select.data.searchStr) > -1
    return (
        <div className={`component-wraper ${className}`}>
            <div className="binder" tabIndex={0}>
                <input {...rest} value={searchStr} type='text' name={name}
                    onChange={e => {
                        setSearchStr(e.target.value)
                    }} placeholder={placeholder} className={`ninput ${inputClassName}`} />
                <svg width="33" height="34" viewBox="0 0 33 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.4043 23.2068L6.63872 14.4412C6.03286 13.8354 6.03286 12.8557 6.63872 12.2562L8.09536 10.7996C8.70122 10.1938 9.68091 10.1938 10.2803 10.7996L16.4936 17.0129L22.7069 10.7996C23.3127 10.1938 24.2924 10.1938 24.8918 10.7996L26.3485 12.2562C26.9543 12.8621 26.9543 13.8418 26.3485 14.4412L17.5829 23.2068C16.9899 23.8127 16.0102 23.8127 15.4043 23.2068Z" fill="white" />
                </svg>
                <div className="compoent-children-wraper component-DropDown">
                    {filtered}
                </div>
            </div>

        </div>
    );
}

const Option = ({ children, value, ...rest }) => {
    // e.target.getAttribute           style={ ? { display: "none" } : {}}
    return (
        <div {...rest} onClick={e => {
            Select.data.setValue({ value, text: children })
            Select.data.setSearchStr(children)
            if (typeof Select.data.onChange === 'function') Select.data.onChange({ value, text: children })
        }} data-value={value} >
            {children}
        </div>
    )
}

Select.Option = Option

Forms.Select = Select
Forms.Input = Input
Forms.Option = Option

export default Forms;