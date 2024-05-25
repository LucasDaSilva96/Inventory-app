import { useQueryClient } from "@tanstack/react-query";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import toast from "react-hot-toast";
import { updateItem } from "../utils/postData";
function EditItem() {
  const { _id } = useParams();
  const queryClient = useQueryClient();
  const items = queryClient.getQueryData(["items"]);
  const [ITEM, SETITEM] = useState(items.find((el) => el._id === _id));

  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(ITEM.title);

  const handleImageChange = (e) => {
    if (e.target.files[0]?.type && e.target.files[0].type.includes("image")) {
      setFile(e.target.files[0]);
    } else {
      toast.error("The selected file is not an image");
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    if (file) {
      formData.append("title", title);
      formData.append("image_url", file);
      formData.append("description", ITEM.description);
      formData.append("price", ITEM.price);
      formData.append("item_amount", ITEM.item_amount);

      await updateItem(ITEM.categoryRef, ITEM.product_code, formData, navigate);
    } else if (!file) {
      formData.append("title", title);
      formData.append("description", ITEM.description);
      formData.append("price", ITEM.price);
      formData.append("item_amount", ITEM.item_amount);
      await updateItem(ITEM.categoryRef, ITEM.product_code, formData, navigate);
    }
  };

  return (
    <section className="flex w-screen h-screen  justify-center">
      {ITEM ? (
        <div
          style={{
            width: "600px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Card
            className="py-4 w-full "
            style={{
              maxHeight: "600px",
              overflowY: "auto",
            }}
          >
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start text-center">
              <div
                style={{
                  width: "100%",
                }}
              >
                <h4 className="font-bold text-large">{title || ITEM.title}</h4>
                <p className="text-tiny uppercase font-bold">
                  Number of items: <span>{ITEM.item_amount}</span>
                </p>
              </div>
            </CardHeader>
            <CardBody
              className="overflow-visible py-2"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
                width: "100%",
              }}
            >
              {file ? (
                <Image
                  style={{ borderRadius: "10px" }}
                  loading="lazy"
                  isBlurred
                  alt={ITEM.title}
                  className="object-cover rounded-xl"
                  src={URL.createObjectURL(file)}
                  width={240}
                />
              ) : (
                <Image
                  style={{ borderRadius: "10px" }}
                  loading="lazy"
                  isBlurred
                  alt={ITEM.title}
                  className="object-cover rounded-xl"
                  src={ITEM.image_url}
                  width={240}
                />
              )}
              <input
                type="file"
                onChange={handleImageChange}
                name="image_url"
                accept="image/png, image/jpeg"
                style={{
                  padding: "10px 0",
                  maxWidth: "200px",
                  overflow: "auto",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <Input
                  style={{ width: "300px" }}
                  type="text"
                  label="Title"
                  value={title}
                  defaultValue={ITEM.title}
                  onInput={(e) => setTitle(e.target.value)}
                />
                <Textarea
                  name="description"
                  label="Description"
                  labelPlacement="outside"
                  placeholder="Enter item description"
                  className="max-w-xs"
                  value={ITEM.description}
                  onChange={(e) =>
                    SETITEM({ ...ITEM, description: e.target.value })
                  }
                />

                <Input
                  min={0}
                  name="price"
                  type="number"
                  label="Price"
                  className="max-w-xs"
                  value={ITEM.price}
                  onInput={(e) =>
                    SETITEM({
                      ...ITEM,
                      price: Number(e.target.value),
                    })
                  }
                />
                <Input
                  min={0}
                  name="item_amount"
                  type="number"
                  label="Amount of items"
                  className="max-w-xs"
                  value={ITEM.item_amount}
                  onInput={(e) =>
                    SETITEM({
                      ...ITEM,
                      item_amount: Number(e.target.value),
                    })
                  }
                />
                <Button
                  color="success"
                  onClick={async () => await handleSubmit()}
                >
                  Save
                </Button>
                <Button color="danger" onPress={() => navigate(-1)}>
                  Cancel
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center gap-3">
          <h1>The selected category was not found. Try again</h1>
          <Button color="primary" onPress={() => navigate("/")}>
            Go back
          </Button>
        </div>
      )}
    </section>
  );
}

export default EditItem;
