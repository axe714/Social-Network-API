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

const thoughts = [
  {
    thoughtText:
      "Well hello there! This is a thought written by yours truly, Allec.",
    username: "alleciscool",
  },
  {
    thoughtText: "I love my mom!",
    username: "brianiscool",
  },
  {
    thoughtText: "I love my dad!",
    username: "keviniscool",
  },
  {
    thoughtText: "I look vietnamese but I am actually Filipino!",
    username: "tonyiscool",
  },
];

const reactions = [
  {
    reactionBody: "Cool story bro",
    username: "brian",
  },
  {
    reactionBody: "Congratulations buddy",
    username: "keviniscool",
  },
  {
    reactionBody: "I like him but hes balding",
    username: "tonyiscool",
  },
  {
    reactionBody: "I love your mom too",
    username: "alleciscool",
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

  await Thought.collection.insertMany(thoughts);
  console.log("Thoughts successfully seeded!");

  await Reaction.collection.insertMany(reactions);
  console.log("Reactions successfully seeded!");

  console.info("------ ALL DATA SEEDED ------");
  process.exit(0);
});
