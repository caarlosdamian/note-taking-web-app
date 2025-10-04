import NextAuth from 'next-auth';
import { Provider } from 'next-auth/providers';
import Credentials from 'next-auth/providers/credentials';
import { createUser, getUser } from './src/actions/auth';
import { compare } from 'bcrypt';

const providers: Provider[] = [
  Credentials({
    credentials: {
      email: {},
      password: {},
      type: {},
    },
    async authorize(credentialValues) {
      const { type, email, password } = credentialValues;
      const user = await getUser(email as string);
      switch (type) {
        case 'signup':
          if (!user) {
            const newUser = await createUser({ email, password } as {
              email: string;
              password: string;
            });

            return newUser;
          }
          throw new Error('Invalid credentials.');
          break;
        case 'signin':
          if (!user) {
            throw new Error('Invalid credentials.');
          }

          const isPassowrdCorrect = await compare(
            password as string,
            user.password
          );

          if (!isPassowrdCorrect) throw new Error('Invalid credentials.');

          return user;
          break;

        default:
          break;
      }

      return {
        id: 'test',
        name: 'Test User',
        email: 'test@example.com',
      };
    },
  }),
];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === 'function') {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== 'credentials');

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  pages: {
    signIn: '/signin',
  },
});
