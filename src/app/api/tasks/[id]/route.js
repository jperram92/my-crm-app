// app/api/tasks/[id]/route.js

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PUT({ params, request }) {
  const { id } = params
  const { subject, description, priority } = await request.json()

  try {
    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: { subject, description, priority },
    })
    return new Response(JSON.stringify(updatedTask), { status: 200 })
  } catch (error) {
    return new Response('Failed to update task', { status: 500 })
  }
}
