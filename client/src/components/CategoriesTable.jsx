import { CiSearch } from "react-icons/ci";
import SideCategoryBox from "./SideCategoryBox";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import ItemBox from "./ItemBox";
import { useNavigate } from "react-router-dom";

function CategoriesTable() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const CATEGORIES = queryClient.getQueryData(["categories"]);
  const ITEMS = queryClient.getQueryData(["items"]);
  const [categories, setCategories] = useState(CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);

  const handleSearchCategory = (e) => {
    const result = CATEGORIES.filter((category) =>
      category.title.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setCategories(result);
  };

  return (
    <section className="flex items-start gap-4  w-screen h-screen">
      <aside className="px-2 flex flex-col gap-3 h-full shadow-sm py-1 rounded-md">
        <div
          className="relative flex items-center py-1"
          style={{
            borderBottom: "1px solid #bdc4ca",
          }}
        >
          <CiSearch fontSize={32} />
          <input
            placeholder="Search for category"
            className="text-center bg-transparent outline-none text-base w-full"
            onChange={handleSearchCategory}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            padding: "10px 0",
            maxHeight: "65dvh",
            overflowY: "auto",
          }}
        >
          {categories.map((category) => (
            <SideCategoryBox
              category={category}
              setSelectedCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
              key={category.title}
            />
          ))}
        </div>

        <Button color="success" onPress={() => navigate("/addCategory")}>
          Add category
        </Button>
      </aside>
      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          maxHeight: "100%",
          overflowY: "auto",
        }}
      >
        {selectedCategory && selectedCategory.items.length > 0 ? (
          selectedCategory.items.map((item) => (
            <ItemBox key={item._id} item={item} />
          ))
        ) : (
          <div
            style={{
              minWidth: "375px",
              width: "500px",
              height: "50dvh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1 className=" text-lg italic ">No items found</h1>
          </div>
        )}
      </div>
    </section>
  );
}

export default CategoriesTable;
