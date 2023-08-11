import React, { useState } from "react";
import { Input, Button } from "semantic-ui-react";

//make sure this doesnt push to main

export default function SearchBar() {

    const [searchValue, setSearchValue] = useState("");

    function handleSearch() {
        console.log("Search submitted:", searchValue);
      }


    function handleChange(e) {
        setSearchValue(e.target.value);
      }



  return (
    <div>
    <Input
      icon="search"
      placeholder="Search..."
      value={searchValue}
      onChange={handleChange}
    />
    <Button onClick={handleSearch}>Search</Button>
  </div>
  );
}
