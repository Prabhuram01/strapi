import React from 'react'
import { Grid, GridItem, Typography } from '@strapi/design-system';
import { useState, useEffect } from 'react';
import { Field, FieldLabel, FieldHint, FieldError, FieldInput, FieldAction, Flex } from '@strapi/design-system';
import { Textarea, Tooltip } from '@strapi/design-system';
import { Button } from '@strapi/design-system';
import restaurantRequests from '../../api/restaurant';
import {
    SingleSelect,
    SingleSelectOption,
    MultiSelect,
    MultiSelectOption
} from '@strapi/design-system';
// const fs = require('fs');

const RestaurantForm = () => {
    const [categoriesList, setCategoriesList] = useState([]);

    const fetchCategories = async () => {
        const allcategories = await restaurantRequests.getAllCategories();
        setCategoriesList(allcategories);
    };

    useEffect(async () => {
        await fetchCategories();
    }, []);

    const [category, setCategory] = useState();
    const [subcategory, setSubcategory] = useState([]);

    let mappedResults;

    async function handleSubmit(event) {
        console.log("Entered handle bro")
        event.preventDefault();

        // const imageFilePath = '"C:\Users\prabh\OneDrive\Pictures\acess.jpg"';

        // const formData = new FormData();
        // formData.append('file', fs.createReadStream(imageFilePath));

        const data = {
            name: String(event.target.restaurantName.value),
            description: String(event.target.description.value),
            r_category: {
                id: category
            },
            r_sub_categories: {
                connect: subcategory
            },
            // img: formData
        };

        const response = await restaurantRequests.addRestaurant(data);
        if (!response.status === 200) {
            alert("success");
            // reset the form
            event.target.restaurantName.value = "";
            event.target.description.value = "";
        } else {
            alert("oops");
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Grid gap={{
                    desktop: 5,
                    tablet: 2,
                    mobile: 1
                }} >
                    <GridItem background="neutral100" padding={1} col={12} s={12}>
                        <Field name="email" required={true}>
                            <Flex direction="column" alignItems="flex-start" gap={1}>
                                <FieldLabel>Name</FieldLabel>
                                <FieldInput type="text" placeholder="Taj Restaurant" name="restaurantName" required />
                            </Flex>
                        </Field>
                    </GridItem>
                    <GridItem background="neutral100" padding={1} col={12} s={12}>
                        <Field name="text" required={true}>
                            <Flex direction="column" alignItems="flex-start" gap={1}>
                                <FieldLabel>Description</FieldLabel>
                                <FieldInput type="text" placeholder="About Taj Restaurant" name="description" required />
                            </Flex>
                        </Field>
                    </GridItem>
                    <GridItem background="neutral100" padding={1} col={12} xs={12}>
                        <Flex direction="column" alignItems="flex-start" gap={1}>
                            <SingleSelect label="Categories" required placeholder="Select a Category" name="category" onClear={() => {
                                setCategory(undefined);
                            }} value={category} onChange={setCategory} >
                                {
                                    categoriesList.map(category => {
                                        return <SingleSelectOption value={category.id}>{category.name}</SingleSelectOption>
                                    })
                                }
                            </SingleSelect>
                        </Flex>
                    </GridItem>
                    {category && <GridItem background="neutral100" padding={1} col={12} xs={12}>
                        <MultiSelect name="subcategory" label="Subcategories" required onClear={() => {
                            setSubcategory(undefined);
                        }} value={subcategory} onChange={setSubcategory} withTags>
                            {
                                mappedResults = categoriesList.map(cat => {
                                    if (cat.id == category) {
                                        return cat.sub_categories.map(subcat => {
                                            return <MultiSelectOption key={subcat.id} value={subcat.id}>{subcat.name}</MultiSelectOption>;
                                        });
                                    } else {
                                        return null;
                                    }
                                })
                            }
                            {console.log(mappedResults)}
                        </MultiSelect>
                    </GridItem>}
                    <GridItem background="neutral100" padding={1} col={12} xs={12}>
                    </GridItem>
                    <GridItem background="neutral100" padding={1} col={12} xs={12}>
                        <Button type="submit">Submit</Button>
                    </GridItem>
                </Grid>
            </form>
        </>
    )
}

export default RestaurantForm