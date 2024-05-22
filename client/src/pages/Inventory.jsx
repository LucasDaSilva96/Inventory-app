import CategoriesTable from "../components/CategoriesTable";

function InventoryPage() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "500px 1fr",
        columnGap: "20px",
      }}
    >
      <CategoriesTable />
    </div>
  );
}

export default InventoryPage;
