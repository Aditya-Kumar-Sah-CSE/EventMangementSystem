// In-memory user store for development when MongoDB is not available
interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

// In-memory storage
const users: Map<string, User> = new Map();

// Helper to generate a simple ID
function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export const mockUserStore = {
  async findOne({ email }: { email: string }): Promise<User | null> {
    for (const user of users.values()) {
      if (user.email === email) return user;
    }
    return null;
  },
  
  async create(data: { name: string; email: string; password: string; role: string }): Promise<User> {
    const user: User = {
      _id: generateId(),
      ...data
    };
    users.set(user._id, user);
    return user;
  },
  
  async findById(id: string): Promise<User | null> {
    return users.get(id) || null;
  }
};

export function clearMockUsers() {
  users.clear();
}