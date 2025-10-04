import { CardForm } from '@/src/components/shared/cardForm';
import { resertPasswordFormItems } from '@/src/utils';

export default async function PasswordPage(props: {
  searchParams: { callbackUrl: string | undefined };
}) {
  return (
    <CardForm
      title="Reset Your Password"
      subtitle="Choose a new password to secure your account."
      formItems={resertPasswordFormItems}
      actionLabel="Reset Password"
      className="max-w-[540px]"
      type='resetPassword'
    />
  );
}
