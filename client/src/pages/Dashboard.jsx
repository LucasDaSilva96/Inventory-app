import DashboardItemsTable from "../components/DashboardItemsTable";

import { useQueryClient } from "@tanstack/react-query";

function Dashboard() {
  const queryClient = useQueryClient();
  const items = queryClient.getQueryData(["items"]);
  const categories = queryClient.getQueryData(["categories"]);
  return (
    <section className="py-4">
      {items && <DashboardItemsTable data={items} categories={categories} />}
      {!items && <h1>No items found</h1>}
    </section>
  );
}

export default Dashboard;
