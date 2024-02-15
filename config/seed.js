require('./connection');
const {faker} = require('@faker-js/faker');
const {User, Thought} = require('../models');

const associateThoughtsWithUsers = async (thoughts) => {
  for (const thought of thoughts) {
    await User.findOneAndUpdate(
      { username: thought.username }, // Find the user by username
      { $push: { thoughts: thought._id } }, // Push the thought's _id to the user's thoughts array
      { new: true } // Return the updated document
    );
  }
};


const createFakeUsers = async (numberOfUsers = 10) => {
  const users = [];

  for (let i = 0; i < numberOfUsers; i++) {

    let username = faker.internet.userName();
    users.push({
      username: username,
      email: `${username}@gmail.com`,
      thoughts: [], // Will populate later
      friends: [] // Will populate later
    });
  }

  return User.insertMany(users);
};

const createFakeThoughts = async (users, numberOfThoughts = 30) => {
  const thoughts = [];

  for (let i = 0; i < numberOfThoughts; i++) {

    let user = users[Math.floor(Math.random() * users.length)]; // Pick a random user for each thought
    thoughts.push({
      thoughtText: faker.lorem.sentence(faker.number.int({ min: 5, max: 20 })),
      username: user.username,
      reactions: [] // Will populate later
    });
  }

  return Thought.insertMany(thoughts);
};
const createReactions = (users, numReactions = 5) => {
  return Array.from({ length: numReactions }, () => {
    const user = users[Math.floor(Math.random() * users.length)]; // Pick a random user for each reaction
    return {
      reactionBody: faker.lorem.sentence(),
      username: user.username,
      createdAt: faker.date.past(),
    };
  });
};

const createFriendships = async (users) => {
  for (const user of users) {
    const friends = faker.helpers.shuffle(users.filter(u => u.username !== user.username)).slice(0, faker.number.int({ min: 1, max: 5 }));
    user.friends = friends.map(friend => friend._id);
    await User.findByIdAndUpdate(user._id, { friends: user.friends });
  }
};

const seedDatabase = async () => {
  await User.deleteMany({});
  await Thought.deleteMany({});

  let users = await createFakeUsers(10);
  users = await User.find(); // Fetch the users again to get their _id fields

  const thoughts = await createFakeThoughts(users, 30);
  await associateThoughtsWithUsers(thoughts);

  // Adding reactions to thoughts
  for (const thought of thoughts) {
    const reactions = createReactions(users);
    await Thought.findByIdAndUpdate(thought._id, { $set: { reactions: reactions } });
  }

  // Creating friendships between users
  await createFriendships(users);

  console.log('Database seeded!');
  process.exit(0);
};

seedDatabase().catch(err => {
  console.error(err);
  process.exit(1);
});