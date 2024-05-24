const BASE_URL = import.meta.env.VITE_BASE_URL;
import axios from "axios";
import { toast } from "react-hot-toast";

export const createNewCategory = async (data) => {
  const toastId = toast.loading("Loading...");
  try {
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    await axios.post(BASE_URL + "category/create", data, config);
    toast.dismiss(toastId);
    toast.success("New category successfully created");
  } catch (e) {
    toast.dismiss(toastId);
    toast.error(e.response.data.message);
  }
};

export const createNewItem = async (data, category_id, navigate) => {
  const toastId = toast.loading("Loading...");
  try {
    if (!category_id) {
      toast.error("No category id provided");
      return;
    }
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    await axios.post(BASE_URL + `item/${category_id}/create`, data, config);
    toast.dismiss(toastId);
    toast.success("Successfully created new item");
    if (navigate) navigate("/");
  } catch (e) {
    toast.dismiss(toastId);
    toast.error(e.response.data.message);
  }
};

export const updateCategory = async (data, id, navigate) => {
  const toastId = toast.loading("Loading...");
  try {
    if (!data || !id) {
      toast.error("Please provide the data and id of the category");
      return;
    }
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    await axios.patch(BASE_URL + `category/${id}/update`, data, config);
    toast.dismiss(toastId);
    toast.success("Category successfully updated");
    if (navigate) navigate("/inventory");
  } catch (e) {
    toast.dismiss(toastId);
    toast.error(e.response.data.message);
  }
};

export const deleteCategory = async (id, navigate) => {
  const toastId = toast.loading("Loading...");
  try {
    if (!id) {
      toast.error("No id provided");
      return;
    }

    await axios.delete(BASE_URL + `category/${id}/delete`);

    toast.dismiss(toastId);
    toast.success("Category successfully deleted");
    if (navigate) navigate("/inventory");
  } catch (e) {
    toast.dismiss(toastId);
    toast.error(e.response.data.message);
  }
};
