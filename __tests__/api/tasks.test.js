import { PrismaClient } from '@prisma/client'
import { GET, POST } from '../src/app/api/tasks/route.js'  // Import the functions directly
import { createMocks } from 'node-mocks-http'

// Mock the Prisma Client to test database interactions
jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => {
      return {
        task: {
          create: jest.fn(),
          findMany: jest.fn(),
        },
      }
    }),
  }
})

// Helper function to create request and response mocks
function mockRequestResponse(method, body = {}) {
  const { req, res } = createMocks({
    method,
    body,
  })
  return { req, res }
}

describe('API Tests for /api/tasks', () => {
  it('should create a task successfully', async () => {
    const taskData = { subject: 'New Task', description: 'Task description', priority: 'high' }
    prisma.task.create.mockResolvedValue(taskData) // Mock the task creation

    const { req, res } = mockRequestResponse('POST', taskData)
    await POST(req, res)

    expect(res._getStatusCode()).toBe(201)
    expect(res._getData()).toEqual(JSON.stringify(taskData))
    expect(prisma.task.create).toHaveBeenCalledWith({
      data: taskData,
    })
  })

  it('should fetch all tasks', async () => {
    const tasksData = [
      { id: 1, subject: 'Task 1', description: 'Description 1', priority: 'low' },
      { id: 2, subject: 'Task 2', description: 'Description 2', priority: 'medium' },
    ]

    prisma.task.findMany.mockResolvedValue(tasksData) // Mock the task fetch

    const { req, res } = mockRequestResponse('GET')
    await GET(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(res._getData()).toEqual(JSON.stringify(tasksData))
    expect(prisma.task.findMany).toHaveBeenCalled()
  })
})
