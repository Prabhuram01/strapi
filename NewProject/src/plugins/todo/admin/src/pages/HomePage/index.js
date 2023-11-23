/*
 *
 * HomePage
 *
 */

import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import pluginId from '../../pluginId';
import { Layout, BaseHeaderLayout, ContentLayout, TextInput, Box, Button, SingleSelect, SingleSelectOption, MultiSelect, MultiSelectOption } from '@strapi/design-system';
// import { List } from '@strapi/icons';
import restaurantRequests from '../../api/restaurant';

const HomePage = () => {

  // const [name, setName] = React.useState("");
  // const [desc, setDesc] = React.useState("");
  // const [selectedcategory, setselectedcategory] = useState("")
  // const [selectedSubcategory, setselectedSubcategory] = useState([])
  // const abc = 0

  // const categories = ["select a category", "Indian Food", "Chinese Food"]
  // const subcategories = {
  //   'Indian Food': ["Biryani", "Butter Nuan"],
  //   'Chinese Food': ["Frog fry"],
  //   'select a category': ["select a valid category"]
  // }
  // const [categoriesList, setCategoriesList] = useState([]);
  // const fetchCategories = async () => {
  //   const allcategories = await restaurantRequests.getCateg();
  //   setCategoriesList(allcategories);
  //   console.log("categoriesList in fetchCategories()");
  // };

  // useEffect(async () => {
  //   await fetchCategories();
  // }, [])

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // setLoading(true);
  //   // await fetchData();

  //   const data = {
  //     Name: String(e.target.name.value),
  //     Desc: String(e.target.desc.value),
  //     category: selectedcategory,
  //     sub_categories: selectedSubcategory[0],
  //   }

  //   console.log("data");
  //   console.log(data);

  //   const response = await restaurantRequests.addRestaurant(data);

  //   console.log("Response data");
  //   console.log(response);
  //   if (response.status === 200) {
  //     alert("success");
  //   } else {
  //     alert("oops");
  //   }
  // };


  return (
    <Layout>
      {/* <BaseHeaderLayout
        title="Restaurant"
        subtitle="This plugin was created for testing of restaurant"
        as="h2" />
      <ContentLayout>
        <form onSubmit={handleSubmit}>

          <Box padding={3}>
            <TextInput placeholder="This is a Name" label="Name" name="name" hint="" onChange={(e) => setName(e.target.value)} value={name} required />
          </Box>
          <Box padding={3}>
            <TextInput placeholder="This is a Description" label="Description" name="desc" hint="Description line" onChange={(e) => setDesc(e.target.value)} value={desc} required />
          </Box>
          <Box padding={3}>
            <SingleSelect label="Category" required placeholder="Select Category" onClear={() => {
              setselectedcategory(undefined);
            }} value={selectedcategory} onChange={setselectedcategory}>
              {
                categories.map(category => {
                  return <SingleSelectOption value={category}>{category}</SingleSelectOption>
                })
              }
            </SingleSelect>
          </Box>

          <Box padding={3}>
            {selectedcategory && <MultiSelect label="Sub Category" required placeholder="Select Sub Category" onClear={() => {
              setselectedSubcategory(undefined);
            }} value={selectedSubcategory} onChange={setselectedSubcategory} withTags onclick="">
              {
                subcategories[selectedcategory].map(subcategory => {
                  return <MultiSelectOption value={subcategory}>{subcategory}</MultiSelectOption>
                })
              }
            </MultiSelect>
            }
          </Box>

          <Box padding={3}>
            <Button type="submit">Submit</Button>
          </Box>
        </form>


      </ContentLayout> */}

    </Layout>
  );
};

export default HomePage
