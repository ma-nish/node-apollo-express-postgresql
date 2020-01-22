import uuidv4 from 'uuid/v4';
import { users, messages } from './rawData';

// const resolvers = {
//   Query: {
//     me: () => {
//       return {
//         username: 'Manish Maurya',
//         email: 'manish.maurya@mail.vinove.com'
//       };
//     },
//     user: (parent, args) => {
//       return {
//         username: 'Dave Davids',
//       };
//     },
//   },
// };

const resolvers = {
  Query: {
    users: () => {
      return Object.values(users);
    },
    user: (parent, { id }) => {
      return users[id];
    },
    me: (parent, args, { me }) => {
      return me;
    },
    messages: () => {
      return Object.values(messages);
    },
    message: (parent, { id }) => {
      return messages[id];
    },
  },

  Mutation: {
    createMessage: (parent, { text }, { me }) => {
      const id = uuidv4();
      const message = {
        id,
        text,
        userId: me.id,
      };

      messages[id] = message;
      users[me.id].messageIds.push(id);

      return message;
    },
    deleteMessage: (parent, { id }) => {
      const { [id]: message, ...otherMessages } = messages;

      if (!message) {
        return false;
      }

      messages = otherMessages;
      
      return true;
    },
  },

  Message: {
    user: message => {
      return users[message.userId]
    }
  },

  User: {
    messages: user => {
      return Object.values(messages).filter(
        message => message.userId === user.id,
      );
    },
  },
};

export default resolvers;