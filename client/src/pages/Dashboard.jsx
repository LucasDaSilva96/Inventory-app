import DashboardItemsTable from "../components/DashboardItemsTable";
import { createNewItem } from "../utils/postData";
import { useQueryClient } from "@tanstack/react-query";

function Dashboard() {
  const queryClient = useQueryClient();
  const items = queryClient.getQueryData(["items"]);
  return (
    <section className="py-4">
      <DashboardItemsTable data={items} />
    </section>
  );
}

export default Dashboard;
