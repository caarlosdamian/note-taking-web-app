import { CardForm } from '@/src/components/shared/cardForm';
import { singupFormItems } from '@/src/utils';

export default async function SignInPage(props: {
  searchParams: { callbackUrl: string | undefined };
}) {
  return (
    <CardForm
      title="Create Your Account"
      subtitle="Sign up to start organizing your notes and boost your productivity."
      formItems={singupFormItems}
      actionLabel="Login"
      className="max-w-[540px]"
      isLoginOrSingup
      type='signup'
    />
  );
}
