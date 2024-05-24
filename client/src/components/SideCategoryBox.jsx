import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { MdOutlineInventory2 } from "react-icons/md";
import { Badge } from "@nextui-org/react";
import { MdAttachMoney } from "react-icons/md";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

function SideCategoryBox({ category, setSelectedCategory, selectedCategory }) {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => setSelectedCategory(category)}
      className="category__box"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        cursor: "pointer",
        width: "100%",
        justifyContent: "space-between",
        borderColor: selectedCategory?._id === category._id ? "#17c964d3" : "",
      }}
    >
      <LazyLoadImage
        alt={category.title}
        height={70}
        src={category.image_url} // use normal <img> attributes as props
        width={70}
        effect="blur"
        threshold={80}
        style={{
          borderRadius: "10px",
        }}
      />
      <h1 className="text-xl">{category.title}</h1>
      <Badge
        content={
          category.category_items_amount > 99
            ? "99+"
            : category.category_items_amount
        }
        color={
          category.category_items_amount < 10
            ? "danger"
            : category.category_items_amount >= 10 &&
              category.category_items_amount <= 20
            ? "warning"
            : "success"
        }
        size="sm"
      >
        <MdOutlineInventory2 fontSize={24} />
      </Badge>

      <div className="flex items-center">
        <MdAttachMoney fontSize={24} />
        <span>{category.total_category_worth}</span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          color="primary"
          size="sm"
          onPress={() => navigate(`/editCategory/${category._id}`)}
        >
          Edit
        </Button>
        <Button
          color="danger"
          size="sm"
          onPress={() => navigate(`/deleteCategory/${category._id}`)}
        >
          Delete
        </Button>
      </div>
    </article>
  );
}

export default SideCategoryBox;
