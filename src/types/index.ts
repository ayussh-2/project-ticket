export interface Hacker {
  id: string;
  name: string;
  email: string;
  teamName: string;
  ticketLink: string;
  registeredBy: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
