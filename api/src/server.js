const { ApolloServer } = require("apollo-server");
const { importSchema } = require("graphql-import");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { MongoClient, ObjectId } = require("mongodb");

dotenv.config();
const { MONGODB_URL, DB_NAME, JWT_SECRET_TOKEN } = process.env;

const getToken = (user) =>
  jwt.sign({ id: user._id }, JWT_SECRET_TOKEN, { expiresIn: "30 days" });

const getUserFromToken = async (token, db) => {
  if (!token) return null;
  const tokenData = jwt.verify(token, JWT_SECRET_TOKEN);
  if (!tokenData?.id) return null;
  return (user = await db
    .collection("Users")
    .findOne({ _id: ObjectId(tokenData.id) }));
};

const typeDefs = importSchema(`${__dirname}/schema/types.graphql`);

const resolvers = {
  Query: {
    myTaskLists: async (_, __, { db, user }) => {
      if (!user) throw new Error("Authentication Error, please login");
      return (taskLists = await db
        .collection("TaskList")
        .find({ userIds: user._id }));
    },
    getTaskList: async (_, { id }, { db, user }) => {
      if (!user) throw new Error("Authentication Error, please login");
      return await db.collection("TaskList").findOne({ _id: ObjectId(id) });
    },
  },
  Mutation: {
    signUp: async (_, { input }, { db }) => {
      const existingUser = await db.collection("Users").findOne({ email: input.email });
      if(existingUser) throw new Error("Email already in use");
      const hashedPassword = bcrypt.hashSync(input.password);
      const newUser = {
        ...input,
        password: hashedPassword,
      };
      const result = await db.collection("Users").insertOne(newUser);
      const user = await db.collection("Users").findOne({ _id: ObjectId(result.insertedId)})
      return {
        user,
        token: getToken(user),
      };
    },

    signIn: async (_, { input }, { db }) => {
      const user = await db.collection("Users").findOne({ email: input.email });
      const isCorrectPassword =
        user && bcrypt.compareSync(input.password, user.password);
      if (!user || !isCorrectPassword) {
        throw new Error("Invalid email or password");
      }
      return {
        user,
        token: getToken(user),
      };
    },

    createTaskList: async (_, { title }, { db, user }) => {
      if (!user) throw new Error("Authentication Error, please login");
      const newTaskList = {
        title,
        createdAt: new Date().toISOString(),
        userIds: [user._id],
      };
      const result = await db.collection("TaskList").insertOne(newTaskList);
      return result.ops[0];
    },

    updateTaskList: async (_, { id, title }, { db, user }) => {
      if (!user) throw new Error("Authentication Error, please login");
      const result = await db
        .collection("TaskList")
        .updateOne({ _id: ObjectId(id) }, { $set: { title } });
      return await db.collection("TaskList").findOne({ _id: ObjectId(id) });
    },

    deleteTaskList: async (_, { id }, { db, user }) => {
      if (!user) throw new Error("Authentication Error, please login");
      // TODO: only people with access should be able to delete
      await db.collection("TaskList").removeOne({ _id: ObjectId(id) });
      return true;
    },

    addUserToTaskList: async (_, { taskListId, userId }, { db, user }) => {
      if (!user) throw new Error("Authentication Error, please login");
      const taskList = await db
        .collection("TaskList")
        .find({ _id: ObjectId(taskListId) });
      if (!taskList) return null;
      if (
        taskList.userIds.find((dbId) => dbId.toString() === userId.toString())
      )
        return taskList;

      await db
        .collection("TaskList")
        .updateOne(
          { _id: ObjectId(taskListId) },
          { $push: { userIds: ObjectId(userId) } }
        );
      taskList.userIds.push(ObjectId(userId));
      return taskList;
    },

    createToDo: async (_, { content, taskListId }, { db, user }) => {
      if (!user) throw new Error("Authentication Error, please login");
      const newToDo = {
        content,
        taskListId: ObjectId(taskListId),
        isCompleted: false,
      };
      const result = await db.collection("ToDo").insertOne(newToDo);
      return result.ops[0];
    },

    updateToDo: async (_, data, { db, user }) => {
      if (!user) throw new Error("Authentication Error, please login");
      await db
        .collection("ToDo")
        .updateOne({ _id: ObjectId(data.id) }, { $set: data });
      return await db.collection("ToDo").findOne({ _id: ObjectId(data.id) });
    },

    deleteToDo: async (_, { id }, { db, user }) => {
      if (!user) throw new Error("Authentication Error, please login");
      // TODO: only people with access should be able to delete
      await db.collection("ToDo").removeOne({ _id: ObjectId(id) });
      return true;
    },
  },

  User: {
    id: ({ _id, id }) => _id || id,
  },
  TaskList: {
    id: ({ _id, id }) => _id || id,
    progress: async ({ _id }, _, { db }) => {
      const todos = await db
        .collection("ToDo")
        .find({ taskListId: ObjectId(_id) })
        .toArray();
      const completed = todos.filter((todo) => todo.isCompleted);
      return todos.length === 0 ? 0 : (100 * completed.length) / todos.length;
    },
    users: async ({ userIds }, _, { db }) =>
      Promise.all(
        userIds.map((userId) => db.collection("Users").findOne({ _id: userId }))
      ),
    todos: async ({ _id }, _, { db }) =>
      await db
        .collection("ToDo")
        .find({ taskListId: ObjectId(_id) })
        .toArray(),
  },
  ToDo: {
    id: ({ _id, id }) => _id || id,
    taskList: async ({ taskListId }, _, { db }) =>
      await db.collection("TaskList").findOne({ _id: ObjectId(taskListId) }),
  },
};

const uri = MONGODB_URL;
const start = async () => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  const db = client.db(DB_NAME);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const user = await getUserFromToken(req.headers.authorization, db);
      return {
        db,
        user,
      };
    },
  });

  // The `listen` method launches a web server.
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

start();
