const faker = require("faker");
const fs = require("fs");

const sales = 22800.15;
const numberOfTransactions = 50;

let reportsForPaymentMethod = [];

const paymentMethods = ["cash", "wechat", "alipay"];
const totals = [9600.05, 5600.05, 7600.05];
let index = 0;
paymentMethods.forEach(item => {
  const total = totals[index];
  reportsForPaymentMethod = [
    ...reportsForPaymentMethod,
    {
      paymenttype: item,
      total,
      percentage: `${Math.round((total / sales) * 10000) / 100}%`
    }
  ];
  index++;
});

const dataGroup = [
  { size: "L", quantity: 30 },
  { size: "M", quantity: 50 },
  { size: "S", quantity: 10 },
  { size: "Others", quantity: 5 }
];

fs.writeFileSync(
  "db.json",
  JSON.stringify({
    reports: { sales, numberOfTransactions, reportsForPaymentMethod, dataGroup }
  })
);
