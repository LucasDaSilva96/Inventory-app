import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { MdOutlineAttachMoney } from "react-icons/md";
import { MdOutlineInventory2 } from "react-icons/md";
function ItemBox({ item }) {
  return (
    <article
      className="py-2 px-2 rounded-md shadow-sm  flex items-center justify-between border border-inherit"
      style={{ minWidth: "450px" }}
    >
      <LazyLoadImage
        alt={item.title}
        height={50}
        src={item.image_url} // use normal <img> attributes as props
        width={50}
        effect="blur"
        threshold={80}
        style={{
          borderRadius: "10px",
        }}
      />
      <p>{item.title}</p>

      <div className="flex items-center gap-1 flex-wrap">
        <strong>Price per Item:</strong>
        <span>{item.price}</span>
        <MdOutlineAttachMoney />
      </div>

      <div className="flex items-center gap-1">
        <MdOutlineInventory2 />
        <span>{item.item_amount}</span>
      </div>
    </article>
  );
}

export default ItemBox;
