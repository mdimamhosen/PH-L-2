const user: {
  name: string;
  age: number;
  password: string;
  readonly company: string;
  contactEmail?: string;
} = {
  name: "John Doe",
  age: 25,
  password: "password123",
  company: "Google",
};
user.company = "Microsoft"; // Error: Cannot assign to 'company' because it is a read-only property.
