import { CiSearch } from "react-icons/ci";
import SideCategoryBox from "./SideCategoryBox";
import { useState } from "react";
import { Button } from "@nextui-org/react";

const CATEGORIES = [
  {
    title: "Computer",
    items: [],
    category_items_amount: 100,
    total_category_worth: 10000,
    image_url: "https://placehold.co/400?text=Image&font=roboto",
  },

  {
    title: "Phone",
    items: [],
    category_items_amount: 20,
    total_category_worth: 500,
    image_url: "https://placehold.co/400?text=Image&font=roboto",
  },

  {
    title: "Keyboard",
    items: [],
    category_items_amount: 0,
    total_category_worth: 0,
    image_url: "https://placehold.co/400?text=Image&font=roboto",
  },
  {
    title: "Computer1",
    items: [],
    category_items_amount: 100,
    total_category_worth: 10000,
    image_url: "https://placehold.co/400?text=Image&font=roboto",
  },

  {
    title: "Phone1",
    items: [],
    category_items_amount: 20,
    total_category_worth: 500,
    image_url: "https://placehold.co/400?text=Image&font=roboto",
  },

  {
    title: "Keyboard1",
    items: [],
    category_items_amount: 0,
    total_category_worth: 0,
    image_url: "https://placehold.co/400?text=Image&font=roboto",
  },
];

function SideBar() {
  const [categories, setCategories] = useState(CATEGORIES);

  const handleSearchCategory = (e) => {
    const result = CATEGORIES.filter((category) =>
      category.title.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setCategories(result);
  };

  return (
    <aside className="px-2 flex flex-col gap-3 h-full">
      <h1
        style={{
          fontSize: "3.2rem",
          fontWeight: "350",
        }}
      >
        Inventory
      </h1>

      <div
        className="relative flex items-center py-1"
        style={{
          borderBottom: "1px solid #bdc4ca",
        }}
      >
        <CiSearch fontSize={32} />
        <input
          placeholder="Search for category"
          className="text-center bg-transparent outline-none text-base"
          onChange={handleSearchCategory}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          maxHeight: "375px",
          overflowY: "auto",
          padding: "10px 0",
        }}
      >
        {categories.map((category) => (
          <SideCategoryBox category={category} key={category.title} />
        ))}
      </div>

      <Button color="success">Add category</Button>
    </aside>
  );
}

export default SideBar;
