export class User {
  username: string;
  id: number;
  email: string;
  name: string;
  surname: string;
  patronymic: string;

  constructor(id: number, username: string, email: string, name: string, surname: string, patronymic: string) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.name = name;
    this.surname = surname;
    this.patronymic = patronymic;
  }
}
