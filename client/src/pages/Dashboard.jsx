import DashboardItemsTable from "../components/DashboardItemsTable";

import { useQueryClient } from "@tanstack/react-query";

function Dashboard() {
  const queryClient = useQueryClient();
  const items = queryClient.getQueryData(["items"]);
  return (
    <section className="py-4">
      {items && <DashboardItemsTable data={items} />}
      {!items && <h1>No items found</h1>}
    </section>
  );
}

export default Dashboard;
