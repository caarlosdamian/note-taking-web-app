import NextAuth from 'next-auth';
import { Provider } from 'next-auth/providers';
import Credentials from 'next-auth/providers/credentials';

const providers: Provider[] = [
  Credentials({
    credentials: { password: { label: 'Password', type: 'password' } },
    authorize(c) {
      console.log(c,'teting')
      if (c.password !== 'password') return null;
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
