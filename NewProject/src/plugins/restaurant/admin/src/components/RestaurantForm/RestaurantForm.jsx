import React from 'react';
import { useState, useEffect } from 'react';
import { Combobox, ComboboxOption } from '@strapi/design-system/Combobox';
import { Stack } from '@strapi/design-system/Stack';
import { Field, FieldLabel, FieldError, FieldHint } from '@strapi/design-system/Field';
import restaurantRequests from '../../api/restaurant';
import { sharedVariable } from '../../../../../todo/admin/src/components/subCategory/subCategory';
import { Box, Flex, MultiSelect, MultiSelectOption, SingleSelect, SingleSelectOption } from '@strapi/design-system';

const RestaurantForm = ({ value,
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
        const allcategories = await restaurantRequests.getAllCategories();
        setCategoriesList(allcategories);
    };

    const categoryNames = categoriesList.map(cat => cat.Name)

    useEffect(async () => {
        await fetchCategories();
    }, []);

    const [category, setCategory] = useState();
    const [subcategory, setSubcategory] = useState(value);

    let mappedResults;

    const onChangeHandler = (data) => {
        console.log("inside onChangehandler")
        console.log("data is", data)
        console.log("value is", value)
        console.log("value is", categoriesList)

        const mappedResults = categoriesList.reduce((accumulator, cat) => {
            if (cat.Name == data) {
                const subcatNames = cat.sub_categories.map(subcat => subcat.Name);
                console.log(subcatNames)
                return accumulator.concat(subcatNames);
            } else {
                return accumulator;
            }
        }, []);

        sharedVariable.setValue(mappedResults);
        console.log("mappedResults", mappedResults)

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
                    <SingleSelect
                        placeholder="Select a Category"
                        aria-disabled={disabled}
                        disabled={disabled}
                        value={value}
                        onChange={(data) => { onChange({ target: { name, value: data, type: attribute.type } }); onChangeHandler(data); }}
                    >
                        {categoryNames.map((category) => (
                            <SingleSelectOption value={category} key={category}>{category}</SingleSelectOption>
                        ))}
                    </SingleSelect>
                </div>
                <FieldHint />
                <FieldError />
            </Stack>
        </Field>
    )
}

export default RestaurantForm