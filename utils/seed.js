const connection = require("../config/connection");
const { User, Thought, Reaction } = require("../models");

const users = [
  {
    username: "alleciscool",
    email: "alleciscool@gmail.com",
  },
  {
    username: "brianiscool",
    email: "brianiscool@gmail.com",
  },
  {
    username: "keviniscool",
    email: "keviniscool@gmail.com",
  },
  {
    username: "tonyiscool",
    email: "tonyiscool@gmail.com",
  },
];

connection.once("open", async () => {
  //deleting everything in database to prevent duplicate
  //seeds
  await User.deleteMany({});
  await Thought.deleteMany({});
  await Reaction.deleteMany({});

  //inserts into database using the seeds created above
  await User.collection.insertMany(users);
  console.log("Users successfully seeded!");

  console.info("------ ALL DATA SEEDED ------");
  process.exit(0);
});
