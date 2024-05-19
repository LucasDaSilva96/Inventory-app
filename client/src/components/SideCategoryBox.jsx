import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function SideCategoryBox({ category }) {
  return (
    <article
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <LazyLoadImage
        alt={category.title}
        height={70}
        src={category.image_url} // use normal <img> attributes as props
        width={70}
        effect="blur"
        threshold={80}
      />
      <h1>{category.title}</h1>
    </article>
  );
}

export default SideCategoryBox;
