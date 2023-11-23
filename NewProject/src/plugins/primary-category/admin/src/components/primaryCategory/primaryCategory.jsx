import React from 'react';
import { useState, useEffect } from 'react';
import primaryCategoryRequests from '../../../../../cj-primary-category/admin/src/api/primaryCategory';
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
        const allcategories = await primaryCategoryRequests.getAllCategories();
        setCategoriesList(allcategories);
    };

    const categoryNames = categoriesList.map(cat => cat.Name)
    const withoutAPandTelangana = categoryNames.filter(item => item !== "Andhra Pradesh" && item !== "Telangana");
    withoutAPandTelangana.sort();
    const sortedCategories = ["Andhra Pradesh", "Telangana", ...withoutAPandTelangana];

    useEffect(() => {
        fetchCategories();
    }, []);

    const onChangeHandler = (data) => {

        const mappedResults = categoriesList.reduce((accumulator, cat) => {
            if (cat.Name == data) {
                const subcatNames = cat.sub_categories.map(subcat => subcat.Name);
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
                    Category
                </FieldLabel>
                <div onLoad={onChangeHandler(value)} >
                    <Combobox
                        placeholder="Select a Category"
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