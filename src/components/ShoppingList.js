import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";
import itemData from "../data/items";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [displayedItems, setDisplayedItems] = useState(itemData);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    filterItems(event.target.value, searchText);
  };

  const handleSearchChange = (searchText) => {
    setSearchText(searchText);
    filterItems(selectedCategory, searchText);
  };

  const filterItems = (category, search) => {
    const filteredItems = itemData.filter((item) => {
      const nameMatches = item.name.toLowerCase().includes(search.toLowerCase());
      const categoryMatches = category === "All" || item.category === category;
      return nameMatches && categoryMatches;
    });
    setDisplayedItems(filteredItems);
  };

  const handleItemFormSubmit = (newItem) => {
    setDisplayedItems((prevItems) => [...prevItems, newItem]);
  };

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={handleItemFormSubmit} />
      <Filter onCategoryChange={handleCategoryChange} onSearchChange={handleSearchChange} search={searchText} />
      <ul className="Items">
        {displayedItems.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
