import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Esta é uma rota de proxy opcional se quiser
  // esconder o backend do frontend
  res.status(200).json({ message: 'Auth API' })
}