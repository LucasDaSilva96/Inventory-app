import { Button, Divider } from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Image } from "@nextui-org/react";
import { createNewCategory } from "../utils/postData";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function AddNewCategoryForm() {
  const { register } = useForm();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createNewCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);

      setTimeout(() => {
        navigate("/inventory");
      }, 700);
    },
  });

  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const handleCreateNewCategory = async (e) => {
    e.preventDefault();
    if (title && file) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("image_url", file);
      mutation.mutate(formData);
    } else if (title && !file) {
      mutation.mutate({ title });
    } else {
      toast.error("No category title provided");
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]?.type && e.target.files[0].type.includes("image")) {
      setFile(e.target.files[0]);
    } else {
      toast.error("The selected file is not an image");
    }
  };
  return (
    <form
      className="w-screen h-screen flex items-center justify-center"
      onSubmit={handleCreateNewCategory}
    >
      <div
        className="flex flex-col items-center gap-2"
        style={{
          minWidth: "375px",
          maxWidth: "800px",
          minHeight: "500px",
        }}
      >
        <div className="flex flex-col gap-2">
          {file ? (
            <Image
              loading="lazy"
              isBlurred
              width={200}
              height={200}
              alt="image"
              src={URL.createObjectURL(file)}
            />
          ) : (
            <Image
              loading="lazy"
              isBlurred
              width={200}
              height={200}
              alt="image"
              src={"https://placehold.co/400?text=Image&font=roboto"}
            />
          )}
        </div>
        <input
          onChange={handleImageChange}
          type="file"
          accept="image/png, image/jpeg"
          name="image_url"
          style={{
            width: "300px",
            overflow: "hidden",
            alignSelf: "end",
          }}
        />
        <Divider />
        <div
          style={{
            padding: "10px 0",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <input
            value={title}
            onInput={(e) => setTitle(e.target.value)}
            style={{
              border: "1px solid #000",
              padding: "5px",
              borderRadius: "10px",
            }}
            name="title"
            {...register("title", { required: true })}
          />
          {!title && <p>This field is required</p>}
          <Button
            type="submit"
            color={!title ? "danger" : "success"}
            disabled={Boolean(!title)}
          >
            {!title ? "Invalid" : "Add"}
          </Button>
        </div>
        <Button color="warning" onPress={() => navigate("/inventory")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default AddNewCategoryForm;
