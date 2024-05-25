const BASE_URL = import.meta.env.VITE_BASE_URL;
import axios from "axios";
import toast from "react-hot-toast";

export const getAllCategories = async () => {
  // const toastId = toast.loading("Loading...");
  try {
    const res = await axios.get(BASE_URL + "categories");
    // toast.dismiss(toastId);

    return res.data.data || [];
  } catch (e) {
    // toast.dismiss(toastId);
    toast.error(e.response.data.message);
  }
};

export const getAllItems = async () => {
  // const toastId = toast.loading("Loading...");
  try {
    const res = await axios.get(BASE_URL + "items");
    // toast.dismiss(toastId);

    return res.data.data || [];
  } catch (e) {
    // toast.dismiss(toastId);
    toast.error(e.response.data.message);
  }
};

export const getStats = async () => {
  try {
    const req = await axios.get(BASE_URL + "stats");

    return req.data.data;
  } catch (e) {
    toast.error(e.response.data.message);
  }
};
