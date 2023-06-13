// Mock data to replace Supabase backend calls

// Mock user data
export const mockUser = {
  id: 'mock-user-123',
  email: 'user@example.com',
  user_metadata: {
    first_name: 'John',
    last_name: 'Doe',
    role: 'control'
  }
}

// Mock tasks data
export const mockTasks = [
  {
    id: 1,
    part: {
      id: 'part-1',
      name: 'Sample Part 1',
      sequence: 1,
      folder: {
        year: 2024,
        type: {
          abbrev: 'NA'
        },
        office: {
          office_num: 101
        }
      }
    },
    pages_number: 25,
    completed_number: 15,
    completed_percent: 60,
    status: 'in_progress',
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    part: {
      id: 'part-2',
      name: 'Sample Part 2',
      sequence: 2,
      folder: {
        year: 2024,
        type: {
          abbrev: 'IMG'
        },
        office: {
          office_num: 102
        }
      }
    },
    pages_number: 40,
    completed_number: 40,
    completed_percent: 100,
    status: 'done',
    created_at: '2024-01-20T14:15:00Z'
  },
  {
    id: 3,
    part: {
      id: 'part-3',
      name: 'Sample Part 3',
      sequence: 3,
      folder: {
        year: 2024,
        type: {
          abbrev: 'PDF'
        },
        office: {
          office_num: 103
        }
      }
    },
    pages_number: 12,
    completed_number: 5,
    completed_percent: 42,
    status: 'to_do',
    created_at: '2024-01-25T09:45:00Z'
  },
  {
    id: 4,
    part: {
      id: 'part-4',
      name: 'Sample Part 4',
      sequence: 4,
      folder: {
        year: 2024,
        type: {
          abbrev: 'DOC'
        },
        office: {
          office_num: 104
        }
      }
    },
    pages_number: 30,
    completed_number: 18,
    completed_percent: 60,
    status: 'in_progress',
    created_at: '2024-02-01T11:20:00Z'
  },
  {
    id: 5,
    part: {
      id: 'part-5',
      name: 'Sample Part 5',
      sequence: 5,
      folder: {
        year: 2024,
        type: {
          abbrev: 'IMG'
        },
        office: {
          office_num: 105
        }
      }
    },
    pages_number: 8,
    completed_number: 8,
    completed_percent: 100,
    status: 'done',
    created_at: '2024-02-05T16:30:00Z'
  },
  {
    id: 6,
    part: {
      id: 'part-6',
      name: 'Sample Part 6',
      sequence: 6,
      folder: {
        year: 2024,
        type: {
          abbrev: 'PDF'
        },
        office: {
          office_num: 106
        }
      }
    },
    pages_number: 22,
    completed_number: 0,
    completed_percent: 0,
    status: 'to_do',
    created_at: '2024-02-10T08:15:00Z'
  }
]

// Mock documents data
export const mockDocuments = [
  {
    id: 'doc-1',
    name: 'Sample Document 1',
    sequence: 1,
    status: 'in_progress',
    created_at: '2024-01-15T10:30:00Z',
    pages: [
      {
        id: 'page-1',
        name: 'Page 1',
        sequence: 1,
        id_document: 'doc-1',
        image_path: 'mock-images/sample1.jpg',
        status: 'done',
        isDirty: false,
        isDeleted: false,
        activities: []
      },
      {
        id: 'page-2',
        name: 'Page 2',
        sequence: 2,
        id_document: 'doc-1',
        image_path: 'mock-images/sample2.jpg',
        status: 'pending',
        isDirty: false,
        isDeleted: false,
        activities: []
      }
    ]
  },
  {
    id: 'doc-2',
    name: 'Sample Document 2',
    sequence: 2,
    status: 'to_do',
    created_at: '2024-01-20T14:15:00Z',
    pages: [
      {
        id: 'page-3',
        name: 'Page 3',
        sequence: 1,
        id_document: 'doc-2',
        image_path: 'mock-images/sample3.jpg',
        status: 'to_do',
        isDirty: false,
        isDeleted: false,
        activities: []
      }
    ]
  }
]

// Mock image URLs for demonstration
export const mockImageUrls = {
  'mock-images/sample1.jpg': 'https://via.placeholder.com/800x600/0066cc/ffffff?text=Sample+Document+1',
  'mock-images/sample2.jpg': 'https://via.placeholder.com/800x600/cc6600/ffffff?text=Sample+Document+2',
  'mock-images/sample3.jpg': 'https://via.placeholder.com/800x600/66cc00/ffffff?text=Sample+Document+3'
}
