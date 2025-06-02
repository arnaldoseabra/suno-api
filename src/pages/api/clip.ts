// src/pages/api/clip.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { sunoApi } from '@/lib/SunoApi';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Missing id parameter' });
    }

    const audioInfo = await (await sunoApi()).getClip(id);

    res.status(200).json(audioInfo);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
