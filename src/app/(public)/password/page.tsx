import { CardForm } from '@/src/components/shared/cardForm';
import { forgotPasswordFormItems } from '@/src/utils';

export default async function PasswordPage(props: {
  searchParams: { callbackUrl: string | undefined };
}) {
  return (
    <CardForm
      title="Forgotten your password?"
      subtitle="Enter your email below, and we’ll send you a link to reset it."
      formItems={forgotPasswordFormItems}
      actionLabel="Send Reset Link"
      className="max-w-[540px]"
      type='password'
    />
  );
}
