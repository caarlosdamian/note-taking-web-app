'use server';

import { auth } from '@/auth';
import dbConnect from '../lib/connectDB';
import User from '../models/user';
import { erroResponse } from '../utils';

export const updateConfig = async ({
  theme,
  font,
}: {
  theme?: string;
  font?: string;
}) => {
  try {
    await dbConnect();
    const {
      user: { email },
    } = (await auth()) as { user: { email: string } };
    const update: Record<string, any> = {};
    if (theme) update['config.theme'] = theme;
    if (font) update['config.font'] = font;

    const user = await User.findOneAndUpdate(
      { email },
      { $set: update },
      { new: true, upsert: false }
    ).lean();

    return JSON.stringify(user);
  } catch (error) {
    console.log('error', error);
    return erroResponse(error as Error);
  }
};

export const getConfig = async ({ key }: { key?: string }) => {
  try {
    await dbConnect();
    const {
      user: { email },
    } = (await auth()) as { user: { email: string } };

    if (!email) return 'inter';

    const user = (await User.findOne({ email }).lean()) as unknown as {
      config: { font: string; theme: string };
    };

    return user.config[key as unknown as keyof typeof user.config];
  } catch (error) {
    console.log('error', error);
    return erroResponse(error as Error);
  }
};
