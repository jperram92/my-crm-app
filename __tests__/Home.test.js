import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Home from '../src/app/page'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

module.exports = {
  testEnvironment: 'jsdom', // Ensures that jsdom is used for DOM manipulations in tests
};

// Mock the API functions (GET and POST)
jest.mock('src/app/api/tasks/route.js', () => ({
  GET: jest.fn(),
  POST: jest.fn(),
}))

describe('Frontend Task Management', () => {
  it('should render the form correctly', () => {
    render(<Home />)

    expect(screen.getByLabelText(/Subject/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Priority/i)).toBeInTheDocument()
    expect(screen.getByText(/Add Task/i)).toBeInTheDocument()
  })

  it('should display a success message when a task is added', async () => {
    // Mock the POST request success
    require('src/app/api/tasks/route.js').POST.mockResolvedValue({
      status: 201,
      message: 'Task added successfully!',
    })

    render(<Home />)

    const subjectInput = screen.getByLabelText(/Subject/i)
    const descriptionInput = screen.getByLabelText(/Description/i)
    const prioritySelect = screen.getByLabelText(/Priority/i)
    const submitButton = screen.getByText(/Add Task/i)

    // Simulate user input
    userEvent.type(subjectInput, 'New Task')
    userEvent.type(descriptionInput, 'A description for the task.')
    userEvent.selectOptions(prioritySelect, 'high')

    fireEvent.click(submitButton)

    // Wait for the success message
    await waitFor(() => screen.getByText(/Task added successfully!/))
    expect(screen.getByText(/Task added successfully!/)).toBeInTheDocument()
  })

  it('should show an error message when task creation fails', async () => {
    // Mock the POST request failure
    require('src/app/api/tasks/route.js').POST.mockRejectedValue({
      status: 500,
      message: 'Failed to add task. Please try again.',
    })

    render(<Home />)

    const subjectInput = screen.getByLabelText(/Subject/i)
    const descriptionInput = screen.getByLabelText(/Description/i)
    const prioritySelect = screen.getByLabelText(/Priority/i)
    const submitButton = screen.getByText(/Add Task/i)

    // Simulate user input
    userEvent.type(subjectInput, 'New Task')
    userEvent.type(descriptionInput, 'A description for the task.')
    userEvent.selectOptions(prioritySelect, 'high')

    fireEvent.click(submitButton)

    // Wait for the error message
    await waitFor(() => screen.getByText(/Failed to add task. Please try again./))
    expect(screen.getByText(/Failed to add task. Please try again./)).toBeInTheDocument()
  })
})
