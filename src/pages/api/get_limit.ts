// src/pages/api/get_limit.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { sunoApi } from '@/lib/SunoApi';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const limitInfo = await (await sunoApi()).get_credits();

    res.status(200).json(limitInfo);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
