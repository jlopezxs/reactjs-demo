import Faker from 'faker';

let data = [];
let max = 200000;

for(let i=0;i<max;i++){
  data.push({
    "name": Faker.commerce.productName(),
    "price": Faker.commerce.price(),
    "color": Faker.commerce.color(),
    "id": i,
    "stock": Faker.random.number()
  });
}
  

export default data