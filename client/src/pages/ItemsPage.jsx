import ItemBox from "../components/ItemBox";

const fakeItems = [
  {
    _id: "664a554e61a1fd2ecccb9855",
    title: "HP Gaming 2000",
    description: "The best gaming computer",
    product_code: "e2a37d52-21f9-43e9-af1c-628f4178bc12",
    price: 5000,
    item_amount: 0,
    total_item_worth: 0,
    image_url: "https://placehold.co/400?text=Image&font=roboto",
    category_ref: "6648f9b8ff473671662f5df1",
    created_at: "2024-05-19T19:38:46.022+00:00",
    __v: 0,
  },
  {
    _id: "664a554e61a1fd2ecccb9856",
    title: "Dell XPS 9500",
    description: "Premium ultrabook",
    product_code: "a1b2c3d4-56e7-89f0-1234-56789abcdef0",
    price: 3000,
    item_amount: 10,
    total_item_worth: 30000,
    image_url: "https://placehold.co/400?text=Image&font=roboto",
    category_ref: "6648f9b8ff473671662f5df2",
    created_at: "2024-05-19T19:38:46.022+00:00",
    __v: 0,
  },
  {
    _id: "664a554e61a1fd2ecccb9857",
    title: "MacBook Pro 2024",
    description: "High-performance laptop",
    product_code: "9a8b7c6d-5e4f-3g2h-1i2j-3k4l5m6n7o8p",
    price: 4500,
    item_amount: 5,
    total_item_worth: 22500,
    image_url: "https://placehold.co/400?text=Image&font=roboto",
    category_ref: "6648f9b8ff473671662f5df3",
    created_at: "2024-05-19T19:38:46.022+00:00",
    __v: 0,
  },
  {
    _id: "664a554e61a1fd2ecccb9858",
    title: "Lenovo ThinkPad X1",
    description: "Business ultrabook",
    product_code: "2f3e4d5c-6b7a-89c0-1d2e-3f4g5h6i7j8k",
    price: 2500,
    item_amount: 8,
    total_item_worth: 20000,
    image_url: "https://placehold.co/400?text=Image&font=roboto",
    category_ref: "6648f9b8ff473671662f5df4",
    created_at: "2024-05-19T19:38:46.022+00:00",
    __v: 0,
  },
  {
    _id: "664a554e61a1fd2ecccb9859",
    title: "Acer Predator Helios",
    description: "High-end gaming laptop",
    product_code: "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
    price: 3500,
    item_amount: 7,
    total_item_worth: 24500,
    image_url: "https://placehold.co/400?text=Image&font=roboto",
    category_ref: "6648f9b8ff473671662f5df5",
    created_at: "2024-05-19T19:38:46.022+00:00",
    __v: 0,
  },
];

function ItemsPage() {
  return (
    <div
      className="flex flex-col"
      style={{
        gap: "20px",
        height: "100%",
        maxHeight: "450px",
        overflowY: "auto",
        alignSelf: "end",
        padding: "10px 0",
      }}
    >
      {fakeItems.map((item) => (
        <ItemBox item={item} key={item._id} />
      ))}
    </div>
  );
}

export default ItemsPage;
