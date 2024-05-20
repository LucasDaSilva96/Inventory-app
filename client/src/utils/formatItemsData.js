export const formateItemAmount = (data) => {
  const result = data.map((item) => {
    return {
      title: item.title,
      value: item.item_amount,
      label: `${item.title} - ${item.item_amount}`,
    };
  });

  return result;
};

export const formateItemTotalWorth = (data) => {
  const result = data.map((item) => {
    return {
      title: item.title,
      value: item.total_item_worth,
      label: `${item.title} - ${item.total_item_worth}$`,
    };
  });

  return result;
};
