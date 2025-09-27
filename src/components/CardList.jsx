import React, { useState, useEffect } from "react";
import Card from "./Card";
import Button from "./Button";
import Search from "./Search";

const CardList = ({ data }) => {
  const limit = 10;

  // state for pagination and filtering
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState(data.slice(0, limit));
  const [filteredData, setFilteredData] = useState(data);

  // update visible products when offset or filtered dataset changes
  useEffect(() => {
    setProducts(filteredData.slice(offset, offset + limit));
  }, [offset, filteredData]);

  // handle next/previous
  const handlePage = (direction) => {
    if (direction === "next" && offset + limit < filteredData.length) {
      setOffset(offset + limit);
    } else if (direction === "prev" && offset - limit >= 0) {
      setOffset(offset - limit);
    }
  };

  // filter products by tags
  const filterTags = (searchTerm) => {
    const term = searchTerm.toLowerCase();
    const results = data.filter((product) =>
      product.tags.some((tag) => tag.toLowerCase().includes(term))
    );
    setFilteredData(results);
    setOffset(0);
  };

  return (
    <div className="cf pa3">
      {/* Search input */}
      <Search handleSearch={filterTags} />

      {/* Products */}
      <div className="mt3 mb3 flex flex-wrap justify-center">
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}

        {products.length === 0 && (
          <p className="tc red">No products match your search.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center pa3">
        <Button
          text="Previous"
          handleClick={() => handlePage("prev")}
          disabled={offset === 0}
        />
        <Button
          text="Next"
          handleClick={() => handlePage("next")}
          disabled={offset + limit >= filteredData.length}
        />
      </div>
    </div>
  );
};

export default CardList;
