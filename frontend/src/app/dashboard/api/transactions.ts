import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Esta é uma rota de proxy opcional
  res.status(200).json({ message: 'Transactions API' })
}