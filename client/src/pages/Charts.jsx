import { useQueryClient } from "@tanstack/react-query";
import DashboardBox from "../components/DashboardBox";
import {
  formateCategoryItemsAmount,
  formateCategoryItemsWorth,
} from "../utils/formatCategoriesData";
import {
  formateItemAmount,
  formateItemTotalWorth,
} from "../utils/formatItemsData";

function Charts() {
  const queryClient = useQueryClient();
  const { items, categories } = queryClient.getQueryData(["stats"]);

  return (
    <section
      style={{
        width: "100%",
        height: "100%",
        maxHeight: "90dvh",
        overflowY: "auto",
        paddingTop: "10px",
        paddingBottom: "20px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "10px",
      }}
    >
      {items.length > 0 ? (
        <>
          <DashboardBox
            data={formateCategoryItemsAmount(categories)}
            fillColor={"#0088FE"}
            h1={"Category items amount"}
          />
          <DashboardBox
            data={formateCategoryItemsWorth(categories)}
            fillColor={"#00C49F"}
            h1={"Category items total worth"}
          />

          <DashboardBox
            data={formateItemAmount(items)}
            fillColor={"#FFBB28"}
            h1={"Items total amount"}
          />

          <DashboardBox
            data={formateItemTotalWorth(items)}
            fillColor={"#FF8042"}
            h1={"Items total worth"}
          />
        </>
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              textAlign: "text",
            }}
          >
            No items found
          </h1>
        </div>
      )}
    </section>
  );
}

export default Charts;
