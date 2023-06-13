// Mock Supabase client to replace backend calls
import { mockUser, mockTasks, mockDocuments } from './MockData'

// Mock authentication methods
const mockAuth = {
  async getUser() {
    return {
      data: { user: mockUser },
      error: null
    }
  },

  async signInWithPassword({ email, password }) {
    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 500))

    if (email && password) {
      return {
        data: { user: mockUser },
        error: null
      }
    }
    return {
      data: { user: null },
      error: { message: 'Invalid email or password' }
    }
  },

  async signUp({ email, password, options }) {
    // Simulate signup delay
    await new Promise(resolve => setTimeout(resolve, 500))

    if (email && password) {
      return {
        data: { user: mockUser },
        error: null
      }
    }
    return {
      data: { user: null },
      error: { message: 'Invalid email or password' }
    }
  },

  async signOut() {
    // Simulate logout delay
    await new Promise(resolve => setTimeout(resolve, 200))
    return { error: null }
  }
}

// Mock database methods
const mockFrom = (table) => ({
  async insert(data) {
    // Simulate insert delay
    await new Promise(resolve => setTimeout(resolve, 300))
    return { data: null, error: null }
  },

  delete() {
    return {
      in(column, values) {
        return {
          async then() {
            // Simulate delete delay
            await new Promise(resolve => setTimeout(resolve, 300))
            return { data: null, error: null }
          }
        }
      }
    }
  }
})

// Mock RPC methods
const mockRpc = async (functionName, params) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400))

  switch (functionName) {
    case 'get_tasks':
      return { data: mockTasks, error: null }
    case 'get_documents_json':
      return { data: mockDocuments, error: null }
    default:
      return { data: [], error: null }
  }
}

// Mock Supabase client
export const supabase = {
  auth: mockAuth,
  from: mockFrom,
  rpc: mockRpc
}
