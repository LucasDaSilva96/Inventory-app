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

function AddNewCategoryForm({ isOpen, onOpenChange }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const initialValue = {
    title: "",
    image: "https://placehold.co/400?text=Image&font=roboto",
    items: [],
  };

  const [FORMDATA, SETFORMDATA] = useState(initialValue);

  const handleCreateNewCategory = (formData) => {
    console.log(formData);
    const { title } = formData;
    SETFORMDATA(initialValue);
  };
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={() => {
        onOpenChange();
        SETFORMDATA(initialValue);
      }}
    >
      <ModalContent>
        {(onClose) => (
          <div
            style={{
              minWidth: "375px",
            }}
          >
            <ModalHeader className="flex flex-col gap-1 capitalize text-center">
              New Category
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col items-center gap-2">
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
                    onInput={(e) =>
                      SETFORMDATA({ ...FORMDATA, title: e.target.value })
                    }
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
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}

export default AddNewCategoryForm;
