import React from 'react';
import { useState, useEffect } from 'react';
import { Button, SingleSelect, SingleSelectOption, Field, FieldLabel, FieldError, FieldHint, Stack } from '@strapi/design-system';

export const sharedVariable = {
    value: [],
    setValue(newValue) {
        this.value = newValue;
    },
};


const RestaurantForm = ({ value,
    onChange,
    name,
    labelAction,
    required,
    attribute,
    description,
    placeholder,
    disabled }) => {

    const [selectedCat, setSelectedCat] = useState(sharedVariable.value)
    const [showDropdown, setShowDropdown] = useState(false)
    const handleRefresh = async () => {
        setShowDropdown(true)
        console.log("inside handler")
        await setSelectedCat(sharedVariable.value)

        console.log(selectedCat)
        console.log("inside handler")
    };

    console.log("Value", typeof (value))
    console.log("Value", value)

    return (
        <Field
            name={name}
            id={name}
            required={required}
            hint={description}
        >
            <Stack spacing={1}>
                <Button onClick={handleRefresh}>Fetch Subcats</Button>
                {/* <button onLoad={ha``}></button> */}
                <FieldLabel action={labelAction}>
                    Sub-Category {value}
                </FieldLabel>
                {showDropdown && <SingleSelect
                    placeholder="Select a Category"
                    aria-disabled={disabled}
                    disabled={disabled}
                    value={value}
                    onChange={data => onChange({ target: { name, value: data, type: attribute.type } })}
                >

                    {selectedCat.map((category) => (
                        <SingleSelectOption value={category} key={category}>{category}</SingleSelectOption>
                    ))}

                </SingleSelect>}
                <FieldHint />
                <FieldError />
            </Stack>
        </Field >
    )
}

export default RestaurantForm