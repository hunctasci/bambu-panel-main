import { hash as _hash } from "bcrypt";
const saltRounds = 10;
const plainTextPassword = "aygul12345";

_hash(plainTextPassword, saltRounds, function (err, hash) {
  // Store the hash in the MongoDB database
  console.log(hash); // Use this hash in your MongoDB insert
});
