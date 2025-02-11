import { createPool } from 'mysql2/promise'

export const pool = createPool({
  host: 'b9r3aotcz3yb3l1xvxbd-mysql.services.clever-cloud.com',
  port: 3306,
  user: 'uxtbg9lfump6nvfk',
  password: '6EmmdLnVVbS1MnbNXjJQ',
  database: 'b9r3aotcz3yb3l1xvxbd'
})