// app/api/tasks/route.js

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const tasks = await prisma.task.findMany()
    return new Response(JSON.stringify(tasks), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch tasks', { status: 500 })
  }
}

export async function POST(request) {
  const { subject, description, priority } = await request.json()

  try {
    const task = await prisma.task.create({
      data: {
        subject,
        description,
        priority,
      },
    })
    return new Response(JSON.stringify(task), { status: 201 })
  } catch (error) {
    return new Response('Failed to create task', { status: 500 })
  }
}
