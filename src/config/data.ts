import { Hacker } from "@/types";

export const mockHackers: Hacker[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    teamName: "Alpha Squad",
    ticketLink: "https://ticket.com/abc123",
    registeredBy: "Admin",
    createdAt: new Date("2024-01-01").toISOString(),
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    teamName: "Beta Team",
    ticketLink: "https://ticket.com/def456",
    registeredBy: "Admin",
    createdAt: new Date("2024-01-02").toISOString(),
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    teamName: "Code Warriors",
    ticketLink: "https://ticket.com/ghi789",
    registeredBy: "Admin",
    createdAt: new Date("2024-01-03").toISOString(),
  },
];

export const mockUsers = [
  {
    id: "1",
    email: "admin@example.com",
    password: "admin123", // In a real app, this would be hashed
    name: "Admin User",
    role: "admin",
  },
];
