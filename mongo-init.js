db = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE);

db.createUser({
  user: process.env.MONGO_INITDB_ROOT_USERNAME,
  pwd: process.env.MONGO_INITDB_ROOT_PASSWORD,
  roles: [{ role: "readWrite", db: process.env.MONGO_INITDB_DATABASE }],
});

// You can add more initialization logic here, such as creating collections or inserting initial data
db.createCollection("employees");
db.createCollection("employers");

// Example of inserting initial data
db.employees.insertOne({ name: "John Doe", email: "john@example.com" });
db.employers.insertOne({ name: "ACME Corp", industry: "Technology" });
