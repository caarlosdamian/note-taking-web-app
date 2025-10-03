import NextAuth from 'next-auth';
import { Provider } from 'next-auth/providers';
import Credentials from 'next-auth/providers/credentials';
import { createUser, getUser } from './src/actions/auth';

const providers: Provider[] = [
  Credentials({
    credentials: {
      email: {},
      password: {},
      type: {},
    },
    async authorize(credentialValues) {
      const { type, email, password } = credentialValues;
      switch (type) {
        case 'register':
          const user = await getUser(email as string);

          if (!user) {
            await createUser({ email, password } as {
              email: string;
              password: string;
            });
          }

          console.log(user, 'USERRRRRR');
          // revisar usuario
          // hash de password
          // guardar usuario
          console.log('ESTAMOS REGISTRANDO');
          break;
        case 'login':
          console.log('ESTAMOS login');
          break;

        default:
          break;
      }
      // login
      // revisar que el usuario exista / si existe comparar la password
      // register
      // revisar que el usuario no  exista / si existe retornar
      // tenemos que hacer un hash de password
      // guardar en base de datos
      // if (c.password !== 'password') return null;
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
