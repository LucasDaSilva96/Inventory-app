import { useState } from "react";
import {
  Input,
  Textarea,
  Select,
  SelectItem,
  Image,
  Button,
} from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createNewItem } from "../utils/postData";
import { useNavigate } from "react-router-dom";

function CreateItem() {
  const queryClient = useQueryClient();
  const categories = queryClient.getQueryData(["categories"]);
  const [itemModel, setItemModel] = useState({
    title: "",
    description: "",
    price: "",
    image_url: "https://placehold.co/400?text=Image&font=roboto",
    categoryRef: "",
    item_amount: 0,
  });
  const navigate = useNavigate();
  const [file, setFile] = useState("");

  const handleImageChange = (e) => {
    if (e.target.files[0]?.type && e.target.files[0].type.includes("image")) {
      setFile(e.target.files[0]);
    } else {
      toast.error("The selected file is not an image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (
      itemModel.title &&
      itemModel.description &&
      itemModel.price &&
      itemModel.categoryRef &&
      !file
    ) {
      formData.append("title", itemModel.title);
      formData.append("description", itemModel.description);
      formData.append("price", itemModel.price);
      formData.append("categoryRef", itemModel.categoryRef);
      itemModel.item_amount > 0
        ? formData.append("item_amount", itemModel.item_amount)
        : null;
      await createNewItem(formData, itemModel.categoryRef, navigate);
    } else if (
      itemModel.title &&
      itemModel.description &&
      itemModel.price &&
      itemModel.categoryRef &&
      file
    ) {
      formData.append("title", itemModel.title);
      formData.append("description", itemModel.description);
      formData.append("price", itemModel.price);
      formData.append("categoryRef", itemModel.categoryRef);
      formData.append("image_url", file);
      itemModel.item_amount > 0
        ? formData.append("item_amount", itemModel.item_amount)
        : null;
      await createNewItem(formData, itemModel.categoryRef, navigate);
    } else {
      toast.error("Please provide title, description, price and category");
    }
  };

  return (
    <section className="w-screen h-screen flex py-2 justify-center overflow-hidden">
      <form
        onSubmit={handleSubmit}
        style={{
          minWidth: "475px",
          maxWidth: "600px",
          height: "800px",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          borderRadius: "10px",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        {!file ? (
          <Image
            isBlurred
            width={240}
            src={itemModel.image_url}
            alt="Image placeholder"
            className="m-5"
          />
        ) : (
          <Image
            isBlurred
            width={240}
            src={URL.createObjectURL(file)}
            alt="Image selected"
            className="m-5"
          />
        )}
        <input
          type="file"
          accept="image/png, image/jpeg"
          name="image_url"
          onChange={handleImageChange}
        />
        <Input
          name="title"
          isRequired
          type="text"
          label="Title"
          className="max-w-xs"
          value={itemModel.title}
          onInput={(e) => setItemModel({ ...itemModel, title: e.target.value })}
        />
        <Textarea
          name="description"
          isRequired
          label="Description"
          labelPlacement="outside"
          placeholder="Enter item description"
          className="max-w-xs"
          value={itemModel.description}
          onChange={(e) =>
            setItemModel({ ...itemModel, description: e.target.value })
          }
        />

        <Input
          name="price"
          isRequired
          type="number"
          label="Price"
          className="max-w-xs"
          value={itemModel.price}
          onInput={(e) =>
            setItemModel({ ...itemModel, price: Number(e.target.value) })
          }
        />
        <Input
          name="item_amount"
          isRequired
          type="number"
          label="Amount of items"
          className="max-w-xs"
          value={itemModel.price}
          onInput={(e) =>
            setItemModel({ ...itemModel, item_amount: Number(e.target.value) })
          }
        />
        <Select
          isRequired
          label="Category"
          placeholder="Select a category for the item"
          className="max-w-xs"
          onChange={(e) =>
            setItemModel({ ...itemModel, categoryRef: e.target.value })
          }
        >
          {categories.map((category) => (
            <SelectItem key={category._id} value={category._id}>
              {category.title}
            </SelectItem>
          ))}
        </Select>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Button type="submit" color="success">
            Create
          </Button>
          <Button type="submit" color="danger" onPress={() => navigate("/")}>
            Cancel
          </Button>
        </div>
      </form>
    </section>
  );
}

export default CreateItem;
