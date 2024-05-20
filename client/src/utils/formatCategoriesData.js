// 1 Category > Items amount
// 2 Category > total_item_worth

export const formateCategoryItemsAmount = (data) => {
  const result = data.map((category) => {
    return {
      title: category.title,
      value: category.category_items_amount,
      label: `${category.title} - ${category.category_items_amount}`,
    };
  });

  return result;
};

export const formateCategoryItemsWorth = (data) => {
  const result = data.map((category) => {
    return {
      title: category.title,
      value: category.total_category_worth,
      label: `${category.title} - ${category.total_category_worth}$`,
    };
  });

  return result;
};
