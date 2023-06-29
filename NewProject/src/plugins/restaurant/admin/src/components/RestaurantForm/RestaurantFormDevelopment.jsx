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
    MultiSelectOption,
    MultiSelectNested,
    /**
     * These imports are still valid, but will be removed in the
     * next major iteration
     */
    Select,
    Option,
    OptGroup,
} from '@strapi/design-system';

const RestaurantForm = () => {
    const [categoriesList, setCategoriesList] = useState([]);

    const fetchCategories = async () => {
        const allcategories = await restaurantRequests.getAllCategories();
        setCategoriesList(allcategories);
        console.log("categoriesList in fetchCategories()");
        // console.log(categoriesList);
    };

    useEffect(async () => {
        await fetchCategories();
    }, []);

    const [category, setCategory] = useState();
    const [subcategory, setSubcategory] = useState([]);
    const categories = ["select a category", "italian", "asian", "mexican"]
    const subcategories = {
        'italian': ["Pasta", "Pizza", "Risotto", "Antipasti"],
        'asian': ["Chinese", "Japanese", "Thai", "Indian"],
        'mexican': ["Tacos", "Burritos", "Enchiladas", "Fajitas"],
        'select a category': ["select a valid category"]
    }

    async function handleSubmit(event) {
        console.log("Entered handle bro")
        event.preventDefault();
        // setLoading(true);

        const data = {
            name: String(event.target.restaurantName.value),
            description: String(event.target.description.value),
            // category: category,
            // subCategory: subcategory[0],
            r_category: {
                id: category
            },
            r_sub_categories: {
                connect: subcategory
            }
            // date: String(event.target.date.value),
        };


        console.log("data");
        console.log(data);
        const response = await restaurantRequests.addRestaurant(data);

        console.log("Response data");
        console.log(response);
        if (response.status === 200) {
            alert("success");
            // reset the form
            // event.target.name.value = "";
            // event.target.email.value = "";
            // event.target.message.value = "";
        } else {
            // console.log("Error sending message");
            alert("oops");
        }
    }
    let mappedResults;
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
                        {/* <Textarea placeholder="This is a content placeholder" label="Description" name="description" hint="Description About Restaurant" labelAction="" required>
                        </Textarea> */}
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
                                        { console.log(`<SingleSelectOption value=${category.id}>${category.name}</SingleSelectOption>`) }
                                        return <SingleSelectOption value={category.id}>{category.name}</SingleSelectOption>
                                    })
                                    // categories.map(category => {
                                    //     return <SingleSelectOption value={category}>{category}</SingleSelectOption>
                                    // })
                                }
                            </SingleSelect>
                        </Flex>
                    </GridItem>
                    {category && <GridItem background="neutral100" padding={1} col={12} xs={12}>
                        <MultiSelect name="subcategory" label="Subcategories" required onClear={() => {
                            setSubcategory(undefined);
                        }} value={subcategory} onChange={setSubcategory} withTags>
                            {
                                // categoriesList.map(cat => {
                                //     console.log("cat");
                                //     console.log(cat);
                                //     console.log(cat.id);
                                //     console.log(cat.id == category);
                                //     console.log("category");
                                //     console.log(category);
                                //     if (cat.id == category) {
                                //         console.log("inside if id category condotion");
                                //         cat.sub_categories.map(subcat => {
                                //             console.log("subcat");
                                //             console.log(subcat.id, subcat.name);
                                //             console.log(`<MultiSelectOption value=${subcat.id}>${subcat.name}</MultiSelectOption>`)
                                //             return <MultiSelectOption key={subcat.id} value={subcat.id}>{subcat.name}</MultiSelectOption>
                                //         })
                                //     } else {
                                //         return null; // or an empty array [] if you want to skip this iteration
                                //     }
                                // })
                                mappedResults = categoriesList.map(cat => {
                                    console.log("cat");
                                    console.log(cat);
                                    console.log(cat.id);
                                    console.log(cat.id == category);
                                    console.log("category");
                                    console.log(category);

                                    if (cat.id == category) {
                                        console.log("inside if id category condition");
                                        return cat.sub_categories.map(subcat => {
                                            console.log("subcat");
                                            console.log(subcat.id, subcat.name);
                                            console.log(`<MultiSelectOption value=${subcat.id}>${subcat.name}</MultiSelectOption>`)
                                            return <MultiSelectOption key={subcat.id} value={subcat.id}>{subcat.name}</MultiSelectOption>;
                                        });
                                    } else {
                                        return null; // or an empty array [] if you want to skip this iteration
                                    }
                                })

                            }
                            {console.log(mappedResults)}
                        </MultiSelect>
                    </GridItem>}
                    <GridItem background="neutral100" padding={1} col={12} xs={12}>
                        {
                            console.log(categoriesList)
                        }
                        {
                            console.log(categoriesList[0])
                        }
                        {
                            // console.log(categoriesList[0].name)
                        }

                    </GridItem>
                    <GridItem background="neutral100" padding={1} col={12} xs={12}>
                        {category}
                    </GridItem>
                    <GridItem background="neutral100" padding={1} col={12} xs={12}>
                        {subcategory}
                        {console.log(subcategory)}
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