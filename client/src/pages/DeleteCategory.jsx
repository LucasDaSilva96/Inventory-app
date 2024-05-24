import { useParams } from "react-router-dom";
import { Button, Divider } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { deleteCategory } from "../utils/postData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
function DeleteCategory() {
  const { id } = useParams();

  const queryClient = useQueryClient();
  const categories = queryClient.getQueryData(["categories"]);
  const CATEGORY = categories.find((el) => el._id === id);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async () => await deleteCategory(id, navigate),
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
          }}
        >
          {CATEGORY.title}
        </h1>
        <div className="flex flex-col">
          <small>Amount of items: {CATEGORY.items.length}</small>
          <small>Category worth: {CATEGORY.total_category_worth}</small>
        </div>
        <Divider />
        <div className="flex flex-col gap-2">
          <Image
            loading="lazy"
            isBlurred
            width={400}
            height={400}
            alt={CATEGORY.title}
            src={CATEGORY.image_url}
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
          <Button
            size="lg"
            color="primary"
            onPress={() => navigate("/inventory")}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DeleteCategory;
