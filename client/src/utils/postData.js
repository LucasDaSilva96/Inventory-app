const BASE_URL = import.meta.env.VITE_BASE_URL;
import axios from "axios";
import { toast } from "react-hot-toast";

export const createNewCategory = async (data) => {
  const toastId = toast.loading("Loading...");
  try {
    await axios.post(BASE_URL + "category/create", data);
    toast.dismiss(toastId);
    toast.success("Successfully created new category");
  } catch (e) {
    toast.dismiss(toastId);
    toast.error(e.response.data.message);
  }
};

export const createNewItem = async (data, category_id) => {
  const toastId = toast.loading("Loading...");
  try {
    await axios.post(BASE_URL + `items/${category_id}/create`, data);
    toast.dismiss(toastId);
    toast.success("Successfully created new item");
  } catch (e) {
    toast.dismiss(toastId);
    toast.error(e.response.data.message);
  }
};
