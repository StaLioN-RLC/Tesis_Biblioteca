import { createPool } from 'mysql2/promise'

export const pool = createPool({
  host: 'bwo2ft9dtbpewdeaq9b8-mysql.services.clever-cloud.com',
  port: 3306,
  user: 'uxtbg9lfump6nvfk',
  password: '6EmmdLnVVbS1MnbNXjJQ',
  database: 'bwo2ft9dtbpewdeaq9b8'
})