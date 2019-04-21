let faker = require("faker");
let fs = require("fs");

let generateWorkers = () => {
  let workers = [];

  for (let id = 0; id < 30; id++) {
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let email = faker.internet.email();

    workers = [
      ...workers,
      {
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: email
      }
    ];
  }

  fs.writeFileSync("db.json", JSON.stringify({ workers }));
};

generateWorkers();
