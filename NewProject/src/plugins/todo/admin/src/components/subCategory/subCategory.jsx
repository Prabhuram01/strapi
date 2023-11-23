import React from 'react';
import { useState } from 'react';
import { Button, SingleSelect, SingleSelectOption, Field, FieldLabel, FieldError, FieldHint, Stack, Tag } from '@strapi/design-system';
import { Plus } from '@strapi/icons';
import { Combobox, ComboboxOption } from '@strapi/design-system';

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

    const [selectedSubCat, setSelectedSubCat] = useState(sharedVariable.value)
    const [showDropdown, setShowDropdown] = useState(false)
    const [showTag, setShowTag] = useState(false)
    const [showDummyTag, setShowDummyTag] = useState(sharedVariable.value.length === 0)
    const handleRefresh = () => {
        setShowDropdown(!showDropdown)
        // console.log("inside handler")
        setSelectedSubCat(sharedVariable.value)
    };

    const handleCheck = () => {
        setShowDummyTag(true ? sharedVariable.value.length === 0 : false)
        if (sharedVariable.value.length != 0) {
            handleRefresh()
            return false
        }
        return true
    }

    return (
        <Field
            name={name}
            id={name}
            required={required}
            hint={description}
        >
            <Stack spacing={2}>
                <FieldLabel action={labelAction}>
                    Sub-Category
                </FieldLabel>
                {!value && showDummyTag && <div onClick={handleCheck}><Button variant='tertiary' disabled={handleCheck} size='L' endIcon={<Plus small></Plus>}>Add Sub-Category</Button></div>}
                {(value || showTag) && !showDropdown && <Button variant='tertiary' onClick={() => { handleRefresh(); setShowTag(!showTag); setShowDummyTag() }} size='L'>{value}</Button>}
                {/* {!value && !showDropdown && !showDummyTag && <Tag onClick={handleRefresh}>Add Sub-Category</Tag>} */}
                {showDropdown &&
                    <Combobox
                        placeholder="Select Sub-Category"
                        aria-disabled={disabled}
                        disabled={disabled}
                        value={value}
                        onChange={data => { onChange({ target: { name, value: data, type: attribute.type } }); handleRefresh; setShowTag(!showTag); setShowDropdown(!showDropdown) }}
                    >
                        {selectedSubCat.map((subCategory) => (
                            <ComboboxOption value={subCategory} key={subCategory}>{subCategory}</ComboboxOption>
                        ))}

                    </Combobox>}
                <FieldHint />
                <FieldError />
            </Stack>
        </Field >
    )
}

export default RestaurantForm