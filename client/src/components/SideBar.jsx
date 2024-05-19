import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";
import SideCategoryBox from "./SideCategoryBox";

const categories = [
  {
    title: "Computer",
    items: [],
    category_items_amount: 0,
    total_category_worth: 0,
    image_url: "https://placehold.co/400?text=Image&font=roboto",
  },

  {
    title: "Phone",
    items: [],
    category_items_amount: 0,
    total_category_worth: 0,
    image_url: "https://placehold.co/400?text=Image&font=roboto",
  },

  {
    title: "Keyboard",
    items: [],
    category_items_amount: 0,
    total_category_worth: 0,
    image_url: "https://placehold.co/400?text=Image&font=roboto",
  },
];

function SideBar() {
  return (
    <aside className="px-2 flex flex-col gap-3">
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
          borderBottom: "1px solid",
        }}
      >
        <CiSearch fontSize={32} />
        <input
          placeholder="Search for category"
          className="text-center bg-transparent outline-none text-base"
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxHeight: "375px",
          overflowY: "auto",
        }}
      >
        {categories.map((category) => (
          <SideCategoryBox category={category} key={category.title} />
        ))}
        {categories.map((category) => (
          <SideCategoryBox category={category} key={category.title} />
        ))}
      </div>
    </aside>
  );
}

export default SideBar;
