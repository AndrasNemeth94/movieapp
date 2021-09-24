export class User {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  constructor(firstName, lastName, password, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.email = email;
  }
}
