import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { MdOutlineAttachMoney } from "react-icons/md";
import { MdOutlineInventory2 } from "react-icons/md";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ItemBox({ item }) {
  const [state, setState] = useState({
    value: item.product_code,
    copied: false,
  });

  const navigate = useNavigate();

  return (
    <Card className="py-4" shadow="md">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <div className="flex items-center gap-4">
          <p className="font-bold flex items-center gap-2">
            <MdOutlineInventory2
              style={{
                color:
                  item.item_amount < 10
                    ? "#f31260"
                    : item.item_amount >= 10 && item.item_amount <= 20
                    ? "#f5a524"
                    : "#17c964",
              }}
            />
            <span
              style={{
                color:
                  item.item_amount < 10
                    ? "#f31260"
                    : item.item_amount >= 10 && item.item_amount <= 20
                    ? "#f5a524"
                    : "#17c964",
              }}
            >
              {item.item_amount}
            </span>
          </p>

          <p className="font-bold flex items-center ">
            <MdOutlineAttachMoney
              style={{
                color: item.total_item_worth < 1 ? "#f31260" : "#17c964",
              }}
            />
            <span
              style={{
                color: item.total_item_worth < 1 ? "#f31260" : "#17c964",
              }}
            >
              {item.total_item_worth}
            </span>
          </p>
        </div>
        <div>
          <h6>Product code</h6>

          <CopyToClipboard
            text={state.value}
            onCopy={() => toast.success("Copied")}
          >
            <small className="text-tiny cursor-pointer hover:underline">
              {state.value}
            </small>
          </CopyToClipboard>
        </div>
        <h4 className="font-bold text-large">{item.title}</h4>
      </CardHeader>
      <CardBody className="py-2">
        <LazyLoadImage
          src={item.image_url}
          alt={item.title}
          effect="blur"
          threshold={100}
          width={270}
          style={{
            borderRadius: "10px",
          }}
        />

        <p
          style={{
            maxWidth: "280px",
            maxHeight: "50px",
            overflowY: "auto",
            textAlign: "center",
            padding: "5px",
            fontStyle: "italic",
          }}
        >
          {item.description}
        </p>

        <div className="flex flex-wrap gap-4 items-center justify-between py-2">
          <Button
            color="primary"
            onPress={() => navigate(`/editItem/${item._id}`)}
          >
            Edit
          </Button>
          <Button
            color="danger"
            onPress={() => navigate(`/deleteItem/${item._id}`)}
          >
            Delete
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

export default ItemBox;
