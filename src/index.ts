import { PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()

const app = express()

app.use(express.json())

app.post(`/user`, async (req, res) => {
    const result = await prisma.user.create({
        data: {
          name: "riyadh",
          email: "riyadh@gmail.com",
          password: "@encrypt123",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          verifiedAt: new Date().toISOString(),
      },
    })
    res.json({
        success: true,
        payload: result,
    })
})

app.get('/user', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json({
    success: true,
    payload: users,
    message: "Operation Successful",
  })
})

app.use((req, res, next) => {
    res.status(404);
    return res.json({
      success: false,
      payload: null,
      message: `API SAYS: Endpoint not found for path: ${req.path}`,
    });
  });

app.listen(3000, () =>
  console.log('REST API server ready at: http://localhost:3000'),
)