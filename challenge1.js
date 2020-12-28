// TASK: Groups

const GROUP_VALUE_RANGE = 10;

const sampleInput = [
  ["Apple", 29],
  ["Banana", 34],
  ["Orange", 38],
  ["Pineapple", 45],  
];

const sortProductArray = (a, b) => (a[1] - b[1]);

const shouldGoOnGroup = (value, group) => {
  const lastPosition = group.length - 1;

  // Value is within GROUP_VALUE_RANGE of the group's first and last elements 
  if (
    (Math.abs(group[0][1] - value) <= GROUP_VALUE_RANGE) &&
    (Math.abs(group[lastPosition][1] - value) <= GROUP_VALUE_RANGE)
  ) return true;

  return false;
};

const splitProductsInGroups = products => {
  const groups = [];

  products.forEach(product => {
    let assigned = false;
    if (groups.length === 0) {  // Groups are empty, initialize the first group with the current product
      groups.push([product]);
      assigned = true;
    } else {
      groups.forEach(group => {
        if (shouldGoOnGroup(product[1], group) && !assigned) {  // Product should go on current group, push it
          group.push(product);
          group.sort(sortProductArray);
          assigned = true;
        }
      });
    };

    if (!assigned) groups.push([product]); // No groups available for product, create a new group
  });

  return groups.map(group => group.map(value => value[0]) ); // We only want the name of the products
}

console.log(splitProductsInGroups(sampleInput));  // Entry point