import React from 'react';
import { useState, useEffect } from 'react';
import cjPrimaryCategoryRequests from '../../../../../cj-primary-category/admin/src/api/primaryCategory';
import { sharedVariable } from '../../../../../primary-sub-category/admin/src/components/PrimarySubCategory/PrimarySubCategory';
import { Combobox, ComboboxOption, Field, FieldLabel, FieldError, FieldHint, Stack } from '@strapi/design-system';


const primaryCategory = ({ value,
    onChange,
    name,
    labelAction,
    required,
    attribute,
    description,
    placeholder,
    disabled }) => {
    const [categoriesList, setCategoriesList] = useState([]);

    const fetchCategories = async () => {
        const allcategories = await cjPrimaryCategoryRequests.getAllCategories();
        setCategoriesList(allcategories);
    };

    const categoryNames = categoriesList.map(cat => cat.Name)
    const sortedCategories = categoryNames.sort()


    useEffect(() => {
        fetchCategories();
    }, []);

    const onChangeHandler = (data) => {

        const mappedResults = categoriesList.reduce((accumulator, cat) => {
            if (cat.Name == data) {
                const subcatNames = cat.cj_sub_categories.map(subcat => subcat.Name);
                return accumulator.concat(subcatNames);
            } else {
                return accumulator;
            }
        }, []);

        sharedVariable.setValue(mappedResults.sort());

    }
    return (
        <Field
            name={name}
            id={name}
            required={required}
            hint={description}
        >
            <Stack spacing={1}>

                <FieldLabel action={labelAction}>
                    primaryCategory
                </FieldLabel>
                <div onLoad={onChangeHandler(value)} >
                    <Combobox
                        placeholder="Select"
                        aria-disabled={disabled}
                        disabled={disabled}
                        value={value}
                        onChange={(data) => { onChange({ target: { name, value: data, type: attribute.type } }); onChangeHandler(data); }}
                    >
                        {sortedCategories.map((category) => (
                            <ComboboxOption value={category} key={category}>{category}</ComboboxOption>
                        ))}
                    </Combobox>
                </div>
                <FieldHint />
                <FieldError />
            </Stack>
        </Field>
    )
}

export default primaryCategory