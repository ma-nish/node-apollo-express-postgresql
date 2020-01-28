import { expect } from 'chai';

import * as userApi from './api';

describe('users', () => {
  it('user is user', () => {
    expect('user').to.eql('user');
  })
});

describe('users', () => {
  describe('user(id: String!): User', () => {
    it('returns a user when user can be found', async () => {
      const expectedResult = {
        data: {
          user: {
            id: '1',
            username: 'manishmaurya',
            email: 'manish@mail.com',
            role: 'ADMIN',
          },
        },
      };

      const result = await userApi.user({ id: '1' });

      expect(result.data).to.eql(expectedResult);
    });

    it('returns null when user can not be found', async () => {
      const expectedResult = {
        data: {
          user: null
        }
      };

      const result = await userApi.user({ id: '63' });

      expect(result.data).to.eql(expectedResult);
    })
  });

  describe('deleteUser(id: String!): Boolean!', () => {
    it('returns an error because only admins can delete a user', async () => {
      const {
        data: {
          data: {
            signIn: { token },
          },
        },
      } = await userApi.signIn({
        login: 'ddavids',
        password: 'password',
      });

      const {
        data: { errors },
      } = await userApi.deleteUser({ id: '2' }, token);

      expect(errors[0].message).to.eql('Not authorized as admin.');
    });
  });
});

describe('messages', () => {
  describe('createMessage(text: String!): Message!', () => {
    it('returns a message when message created', async () => {
      const {
        data: {
          data: {
            signIn: { token },
          },
        },
      } = await userApi.signIn({
        login: 'ddavids',
        password: 'password',
      });

      const {
        data: {
          data: {
            createMessage: { text }
          }
        } } = await userApi.createMessage({ text: "New message created" }, token);

      expect(text).to.eql('New message created');
    });
  });

  describe('deleteMessage (id: ID!): Boolean!', () => {
    it('returns true when message deleted', async () => {
      const {
        data: {
          data: {
            signIn: { token },
          },
        },
      } = await userApi.signIn({
        login: 'ddavids',
        password: 'password',
      });

      const { data: { data: { deleteMessage } } } = await userApi.deleteMessage({ id: '2' }, token);

      expect(deleteMessage).to.eql(true);
    })
  })
})

