export interface Env {
  isDev: boolean
  isProd: boolean
  isTest: boolean
  database: {
    url: string
    username: string
    password: string
  }
  jwt: {
    secret: string
  }
}
