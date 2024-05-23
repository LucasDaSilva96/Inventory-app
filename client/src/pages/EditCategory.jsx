import { useQueryClient } from "@tanstack/react-query";
import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Input } from "@nextui-org/react";
import toast from "react-hot-toast";

function EditCategory() {
  const { _id } = useParams();
  const queryClient = useQueryClient();
  const categories = queryClient.getQueryData(["categories"]);
  const [CATEGORY, SETCATEGORY] = useState(
    categories.find((el) => el._id === _id)
  );

  const navigate = useNavigate();

  const [file, setFile] = useState(CATEGORY.image_url);

  const handleImageChange = (e) => {
    if (e.target.files[0]?.type && e.target.files[0].type.includes("image")) {
      setFile(URL.createObjectURL(e.target.files[0]));
    } else {
      toast.error("The selected file is not an image");
    }
    console.log(e.target.files[0]);
  };

  return (
    <section className="flex w-screen h-screen items-center justify-center">
      {CATEGORY ? (
        <div
          style={{
            width: "50%",
            minWidth: "375px",
            maxWidth: "700px",
          }}
        >
          <Card className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-tiny uppercase font-bold">Number of items</p>
              <small className="text-default-500">
                {CATEGORY.items.length}
              </small>
              <h4 className="font-bold text-large">{CATEGORY.title}</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Image
                style={{ borderRadius: "10px" }}
                loading="lazy"
                isBlurred
                alt={CATEGORY.title}
                className="object-cover rounded-xl"
                src={file}
                width={280}
              />
              <input
                type="file"
                onChange={handleImageChange}
                style={{
                  padding: "10px 0",
                  maxWidth: "200px",
                  overflow: "auto",
                }}
              />
              <div
                style={{
                  marginTop: "40px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <Input
                  type="text"
                  label="Title"
                  value={CATEGORY.title}
                  onInput={(e) =>
                    SETCATEGORY({ ...CATEGORY, title: e.target.value })
                  }
                />
                <Button color="success">Save</Button>
                <Button color="danger" onPress={() => navigate("/inventory")}>
                  Cancel
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center gap-3">
          <h1>The selected category was not found. Try again</h1>
          <Button color="primary" onPress={() => navigate("/inventory")}>
            Go back
          </Button>
        </div>
      )}
    </section>
  );
}

export default EditCategory;
