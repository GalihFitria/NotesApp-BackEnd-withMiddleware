import { Pool } from 'pg';

class NoteRepositories {
  constructor() {
    this.pool = new Pool();
  }
}
