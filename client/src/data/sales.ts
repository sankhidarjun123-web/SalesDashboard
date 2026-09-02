type SaleStatus = "pending" | "shipped" | "cancelled";

interface Sale {
  _id: string;
  title: string;
  amount: number;
  status: SaleStatus;
}

export const dummySales: Sale[] = [
  {
    _id: "1",
    title: "Laptop",
    amount: 75000,
    status: "shipped",
  },
  {
    _id: "2",
    title: "Wireless Mouse",
    amount: 1500,
    status: "pending",
  },
  {
    _id: "3",
    title: "Mechanical Keyboard",
    amount: 5500,
    status: "shipped",
  },
  {
    _id: "4",
    title: "Gaming Monitor",
    amount: 25000,
    status: "cancelled",
  },
  {
    _id: "5",
    title: "USB-C Hub",
    amount: 3000,
    status: "pending",
  },
  {
    _id: "6",
    title: "Headphones",
    amount: 4500,
    status: "shipped",
  },
  {
    _id: "7",
    title: "Webcam",
    amount: 6000,
    status: "pending",
  },
  {
    _id: "8",
    title: "Office Chair",
    amount: 12000,
    status: "cancelled",
  },
  {
    _id: "9",
    title: "External SSD",
    amount: 8500,
    status: "shipped",
  },
  {
    _id: "10",
    title: "Smartphone",
    amount: 40000,
    status: "pending",
  },
  {
    _id: "11",
    title: "Tablet",
    amount: 30000,
    status: "shipped",
  },
  {
    _id: "12",
    title: "Bluetooth Speaker",
    amount: 3500,
    status: "cancelled",
  },
];