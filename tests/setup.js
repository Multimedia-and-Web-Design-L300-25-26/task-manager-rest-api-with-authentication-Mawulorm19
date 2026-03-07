import dotenv from "dotenv";
import mongoose from "mongoose";

// Load test environment variables
dotenv.config({ path: ".env.test" });

// Set JWT_SECRET if not defined
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = "test_jwt_secret_key";
}

// Connect to test database before all tests
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

// Clean up collections before each test file
beforeEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

// Disconnect after all tests
afterAll(async () => {
  await mongoose.connection.close();
});