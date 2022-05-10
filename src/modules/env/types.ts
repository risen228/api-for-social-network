export interface Env {
  database: {
    url: string
    username: string
    password: string
  }
  jwt: {
    secret: string
  }
}
