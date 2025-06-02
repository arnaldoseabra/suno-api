// src/pages/api/custom_generate.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { sunoApi } from '@/lib/SunoApi';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, tags, title, make_instrumental, model, wait_audio, negative_tags } = req.body;

    if (!prompt || !tags || !title) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const audioInfo = await (await sunoApi()).custom_generate(
      prompt,
      tags,
      title,
      make_instrumental ?? false,
      model,
      wait_audio ?? false,
      negative_tags
    );

    res.status(200).json(audioInfo);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
