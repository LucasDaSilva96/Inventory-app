import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Image,
  Divider,
} from "@nextui-org/react";

function ItemDetailsModal({ item, isOpen, onOpen, onOpenChange }) {
  const {
    title,
    description,
    product_code,
    price,
    item_amount,
    total_item_worth,
    image_url,
  } = item;
  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>
                <Image
                  isBlurred
                  width={300}
                  src={image_url}
                  alt={title}
                  className="m-5"
                />
                <Divider />
                <div
                  className="flex items-center gap-1"
                  style={{
                    maxWidth: "375px",
                    maxHeight: "50px",
                    overflow: "scroll",
                    padding: "10px 0",
                  }}
                >
                  <strong>Description:</strong>
                  <span style={{ fontSize: "16px" }}>{description}</span>
                </div>
                <Divider />
                <div className="flex items-center gap-1">
                  <strong>Product Code:</strong>
                  <span style={{ fontSize: "14px" }}>{product_code}</span>
                </div>
                <Divider />
                <div className="flex items-center gap-1">
                  <strong>Price per {title}:</strong>
                  <span style={{ fontSize: "16px" }}>{price}$</span>
                </div>
                <Divider />
                <div className="flex items-center gap-1">
                  <strong>Amount of {title}:</strong>
                  <span style={{ fontSize: "16px" }}>{item_amount}</span>
                </div>
                <Divider />
                <div className="flex items-center gap-1">
                  <strong>Total {title} worth:</strong>
                  <span style={{ fontSize: "16px" }}>{total_item_worth}$</span>
                </div>
                <Divider />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ItemDetailsModal;
