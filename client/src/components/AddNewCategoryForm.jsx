import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
} from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Image } from "@nextui-org/react";
import { FaCamera } from "react-icons/fa";
import { createNewCategory } from "../utils/postData";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function AddNewCategoryForm({ isOpen, onOpenChange }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const initialValue = {
    title: "",
    image: "https://placehold.co/400?text=Image&font=roboto",
  };

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createNewCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);

      setTimeout(() => {
        navigate("/inventory");
      }, 500);
    },
  });

  const [FORMDATA, SETFORMDATA] = useState(initialValue);

  const handleCreateNewCategory = async (formData) => {
    if (FORMDATA.title) {
      mutation.mutate(FORMDATA);
      onOpenChange();
    } else {
      toast.error("No category title provided");
    }

    SETFORMDATA(initialValue);
  };
  return (
    <section className="w-screen h-screen flex items-center justify-center">
      <div
        className="flex flex-col items-center gap-2"
        style={{
          minWidth: "375px",
          maxWidth: "800px",
          minHeight: "500px",
        }}
      >
        <div className="flex flex-col gap-2">
          <Image
            loading="lazy"
            isBlurred
            width={200}
            height={200}
            alt="NextUI hero Image with delay"
            src={FORMDATA.image}
          />
          <Button color="primary" endContent={<FaCamera />}>
            Upload image
          </Button>
        </div>
        <Divider />
        <form
          onSubmit={handleSubmit(handleCreateNewCategory)}
          style={{
            padding: "10px 0",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <input
            value={FORMDATA.title}
            onInput={(e) => SETFORMDATA({ ...FORMDATA, title: e.target.value })}
            style={{
              border: "1px solid #000",
              padding: "5px",
              borderRadius: "10px",
            }}
            name="title"
            {...register("title", { required: true })}
          />
          {errors.title && <p>This field is required</p>}
          <Button
            type="submit"
            color={errors.title ? "danger" : "success"}
            disabled={Boolean(errors.title)}
          >
            {errors.title ? "Invalid" : "Add"}
          </Button>
        </form>
        <Button color="warning" onPress={() => navigate("/inventory")}>
          Cancel
        </Button>
      </div>
    </section>
  );
}

export default AddNewCategoryForm;
