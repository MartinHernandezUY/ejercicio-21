const { faker } = require("@faker-js/faker");
const { Comment } = require("../models");

faker.locale = "es";

module.exports = async () => {
  const comments = [];

  for (let i = 0; i < 500; i++) {
    comments.push({
      content: faker.lorem.paragraphs(),
      userId: faker.datatype.number({
        min: 1,
        max: 4,
      }),
      articleId: faker.datatype.number({
        min: 1,
        max: 15,
      }),
    });
  }

  await Comment.bulkCreate(comments);
  console.log("[Database] Se corrió el seeder de Comments.");
};
