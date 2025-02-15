'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [tasks, setTasks] = useState([])
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('medium')

  const [message, setMessage] = useState('') // For success/error messages
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Fetch tasks from the API
    async function fetchTasks() {
      const res = await fetch('/api/tasks')
      const data = await res.json()
      setTasks(data)
    }

    fetchTasks()
  }, [tasks])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const newTask = { subject, description, priority }

    try {
      // Send task data to the API to save it
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      })

      if (response.ok) {
        setMessage('Task added successfully!')
        // Clear the form after submission
        setSubject('')
        setDescription('')
        setPriority('medium')
      } else {
        setMessage('Failed to add task. Please try again.')
      }
    } catch (error) {
      setMessage('Error: Unable to communicate with the backend.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Task Management</h1>

      {/* Success/Error message */}
      {message && (
        <div
          className={`p-4 rounded-md mb-6 ${
            message.includes('successfully')
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label htmlFor="subject" className="text-lg font-medium mb-2">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="text-lg font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            rows="4"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="priority" className="text-lg font-medium mb-2">
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button
          type="submit"
          className={`w-full py-3 rounded-md text-white ${
            loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
          disabled={loading}
        >
          {loading ? 'Adding Task...' : 'Add Task'}
        </button>
      </form>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Tasks</h2>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task.id} className="p-4 border-2 border-gray-300 rounded-lg">
            <h3 className="font-bold text-xl">{task.subject}</h3>
            <p className="text-gray-700">{task.description}</p>
            <p className="mt-2">
              <span
                className={`inline-block py-1 px-3 rounded-full text-sm text-black ${
                  task.priority === 'high'
                    ? 'bg-red-100 text-red-800'
                    : task.priority === 'medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
