import Faker from 'faker';

let data = [];
const max = 200000;
const colors = ["#673ab7", "#9c27b0", "#e91e63", "#f44336", "#3f51b5", "#2196f3", "#2196f3", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722"];
let colorsLength = colors.length;
let colorPosition;

for(let i=0;i<max;i++){
  colorPosition = Math.floor(Math.random() * (colorsLength - 0 + 1))
  data.push({
    "name": Faker.commerce.productName(),
    "price": Faker.commerce.price(),
    "color": colors[colorPosition],
    "id": i,
    "stock": Faker.random.number()
  });
}
  

export default data