import { redirect } from 'next/navigation';
import { signIn, auth, providerMap } from '../../../../auth';
import { AuthError } from 'next-auth';
import { checkDBConnection } from '@/src/actions/healtcheck';
import { CardForm } from '@/src/components/shared/cardForm';
import { singinFormItems } from '@/src/utils';

const SIGNIN_ERROR_URL = '/error';

export default async function SignInPage(props: {
  searchParams: { callbackUrl: string | undefined };
}) {
  const testing = await checkDBConnection();

  return (
    <CardForm
      title="Welcome to Note"
      subtitle="Please log in to continue"
      formItems={singinFormItems}
      actionLabel="Login"
      className='max-w-[540px]'
    />
    // {/* <form
    //   className="flex flex-col"
    //   action={async (formData) => {
    //     'use server';
    //     try {
    //       await signIn('credentials', formData);
    //     } catch (error) {
    //       if (error instanceof AuthError) {
    //         return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
    //       }
    //       throw error;
    //     }
    //   }}
    // >
    //   <label htmlFor="email" className="text-white">
    //     Email
    //     <input name="email" id="email" />
    //   </label>
    //   <label htmlFor="password" className="text-white">
    //     Password
    //     <input name="password" id="password" />
    //   </label>
    //   <input type="submit" value="Sign In" />
    // </form> */}
  );
}
