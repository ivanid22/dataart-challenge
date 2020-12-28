// TASK: Groups2

const GROUP_VALUE_RANGE = 10;

sampleInput = [
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


/* The main difference with the first challenge is that we compare the current product to every existing group,
   no matter if it has already been assigned. Also, we keep track of the products we've already assigned, and check them
   every time a new group is created to see if any of those products would fit in the new group */

const splitProductsInGroups = products => {
  const groups = [];
  const assignedProducts = [];

  products.forEach(product => {
    let assigned = false;
    if (groups.length === 0) {  // Groups are empty, initialize the first group with the current product
      groups.push([product]);
      assignedProducts.push(product);
      assigned = true;
    } else {
      groups.forEach(group => {
        if (shouldGoOnGroup(product[1], group)) {  // Product should go on current group, push it
          group.push(product);
          group.sort(sortProductArray);
          assignedProducts.push(product);
          assigned = true;
        }
      });
    };

    if (!assigned) {
      const newGroup = [product];
      // When creating a new group, check every product already assigned to see if it's a match for the new group
      assignedProducts.forEach(p => {
        if (shouldGoOnGroup(p[1], newGroup)) newGroup.push(p);
        newGroup.sort(sortProductArray);
      });
      groups.push(newGroup);
      assignedProducts.push(product);
    }
  });

  return groups.map(group => group.map(value => value[0]) ); // We only want the name of the products
}

console.log(splitProductsInGroups(sampleInput));  // Entry point
