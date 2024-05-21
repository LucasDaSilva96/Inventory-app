import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Input,
  Tooltip,
  Chip,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import { IoAddOutline, IoChevronDownCircleOutline } from "react-icons/io5";
import { SearchIcon } from "./SearchIcon";
import { IoEyeSharp } from "react-icons/io5";
import { RiEditFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

export default function DashboardItemsTable({ data }) {
  const [page, setPage] = React.useState(1);
  const [filterValue, setFilterValue] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "item_amount",
    direction: "ascending",
  });

  const hasSearchFilter = Boolean(filterValue);

  const pages = Math.ceil(data.length / rowsPerPage);
  // //////////////////////////////////////////////////////////
  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  // //////////////////////////////////////////////////////////
  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  // //////////////////////////////////////////////////////////

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  // //////////////////////////////////////////////////////////

  const filteredItems = React.useMemo(() => {
    let filteredItems = [...data];

    if (hasSearchFilter) {
      filteredItems =
        filteredItems.filter((item) =>
          item.title.toLowerCase().includes(filterValue.toLowerCase())
        ).length <= 0
          ? filteredItems.filter((item) => item.product_code === filterValue)
          : filteredItems.filter((item) =>
              item.title.toLowerCase().includes(filterValue.toLowerCase())
            );
    }

    return filteredItems.sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [data, filterValue, hasSearchFilter, sortDescriptor]);

  // //////////////////////////////////////////////////////////
  let items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  // //////////////////////////////////////////////////////////
  const renderCell = React.useCallback((data, columnKey) => {
    const cellValue = data[columnKey];

    switch (columnKey) {
      case "image_url":
        return (
          // <User
          //   avatarProps={{ radius: "lg", src: data.image_url }}
          //   description={data.title}
          // ></User>
          <Avatar
            src={data.image_url}
            alt={data.title}
            isBordered
            showFallback
            size="lg"
            color={
              data.item_amount <= 0
                ? "danger"
                : data.item_amount >= 1 && data.item_amount <= 20
                ? "warning"
                : "success"
            }
          />
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
          <Chip
            className="capitalize"
            size="sm"
            color={
              cellValue < 1
                ? "danger"
                : cellValue > 1 && cellValue <= 20
                ? "warning"
                : "success"
            }
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "total_item_worth":
        return (
          <Chip className="capitalize" size="sm" variant="flat">
            {cellValue}$
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-4">
            <Tooltip content="Details" color="primary">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <IoEyeSharp color="#006FEE" />
              </span>
            </Tooltip>
            <Tooltip content="Edit item" color="warning">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <RiEditFill color="#f5a524" />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete item">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <MdDelete />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  // //////////////////////////////////////////////////////////
  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="sm:flex">
                <Button
                  endContent={<IoChevronDownCircleOutline fontSize={20} />}
                  variant="flat"
                >
                  Sort items amount
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect
                selectionMode="single"
                onSelectionChange={(e) =>
                  setSortDescriptor({
                    ...sortDescriptor,
                    direction: e.currentKey,
                  })
                }
              >
                <DropdownItem
                  key={"ascending"}
                  value={"ascending"}
                  className="capitalize"
                >
                  ascending
                </DropdownItem>
                <DropdownItem
                  key={"descending"}
                  value={"descending"}
                  className="capitalize"
                >
                  descending
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Button color="primary" endContent={<IoAddOutline />}>
              ADD NEW ITEM
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {filteredItems.length} items
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    onRowsPerPageChange,
    filteredItems.length,
    onSearchChange,
    onClear,
    sortDescriptor,
  ]);

  // //////////////////////////////////////////////////////////
  return (
    <aside
      style={{
        maxHeight: "90dvh",
        overflowY: "auto",
        paddingBottom: "20px",
      }}
    >
      <Table
        isStriped
        topContent={topContent}
        topContentPlacement="outside"
        aria-label="Items table"
        sortDescriptor={sortDescriptor}
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
      >
        <TableHeader>
          <TableColumn key="image_url">ITEM</TableColumn>
          <TableColumn key="title">TITLE</TableColumn>
          <TableColumn key="item_amount">AMOUNT</TableColumn>
          <TableColumn key="total_item_worth">TOTAL WORTH</TableColumn>
          <TableColumn key="actions">ACTIONS</TableColumn>
        </TableHeader>

        <TableBody emptyContent={"No item found"} items={items}>
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </aside>
  );
}
