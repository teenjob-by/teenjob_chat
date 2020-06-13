import { v4 as uuidv4 } from "uuid";

class Room {
  id: string;

  constructor() {
    this.id = uuidv4();
  }
}

export { Room };
