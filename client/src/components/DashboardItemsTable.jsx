import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  Input,
  User,
  Chip,
} from "@nextui-org/react";

import { SearchIcon } from "./SearchIcon";

export default function DashboardItemsTable({ data }) {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(data.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data]);

  const renderCell = React.useCallback((data, columnKey) => {
    const cellValue = data[columnKey];

    switch (columnKey) {
      case "image_url":
        return (
          <User
            avatarProps={{ radius: "lg", src: data.image_url }}
            description={data.title}
            name={cellValue}
          >
            {data.title}
          </User>
        );
      case "title":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold text-tiny capitalize text-default-400">
              {data.title}
            </p>
          </div>
        );
      case "item_amount":
        return (
          <Chip className="capitalize" size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "total_item_worth":
        return (
          <Chip className="capitalize" size="sm" variant="flat">
            {cellValue}$
          </Chip>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <aside>
      <Input
        isClearable
        className="w-full sm:max-w-[44%]"
        placeholder="Search title or product code"
        startContent={<SearchIcon />}
      />
      <Table
        aria-label="Items table"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="success"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader>
          <TableColumn key="title">TITLE</TableColumn>
          <TableColumn key="item_amount">AMOUNT</TableColumn>
          <TableColumn key="total_item_worth">TOTAL WORTH</TableColumn>
        </TableHeader>

        <TableBody emptyContent={"No users found"} items={data}>
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>

        {/* <TableBody items={items}>
          {(item) => (
            <TableRow key={item.title}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody> */}
      </Table>
    </aside>
  );
}
