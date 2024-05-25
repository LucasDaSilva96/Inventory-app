import { useParams } from "react-router-dom";
import { Button, Divider } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { deleteItem } from "../utils/postData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function DeleteItem() {
  const { id } = useParams();

  const queryClient = useQueryClient();
  const items = queryClient.getQueryData(["items"]);
  const ITEM = items.find((el) => el._id === id);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async () =>
      await deleteItem(ITEM.categoryRef, ITEM.product_code, navigate),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const handleDelete = () => {
    if (id) {
      mutation.mutate();
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div
        className="flex flex-col items-center gap-2"
        style={{
          minWidth: "375px",
          maxWidth: "800px",
          minHeight: "500px",
        }}
      >
        <h1
          style={{
            fontSize: "36px",
            textDecoration: "underline",
          }}
        >
          Delete Item
        </h1>
        <h2
          style={{
            fontSize: "26px",
          }}
        >
          {ITEM.title}
        </h2>
        <div className="flex flex-col">
          <small>Amount of items: {ITEM.item_amount}</small>
          <small>Item worth: {ITEM.total_item_worth}</small>
        </div>
        <Divider />
        <div className="flex flex-col gap-2">
          <Image
            loading="lazy"
            isBlurred
            width={400}
            height={400}
            alt={ITEM.title}
            src={ITEM.image_url}
          />
        </div>

        <Divider />
        <div
          style={{
            padding: "10px 0",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        ></div>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button size="lg" color="danger" onPress={handleDelete}>
            Delete
          </Button>
          <Button size="lg" color="primary" onPress={() => navigate(-1)}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DeleteItem;
