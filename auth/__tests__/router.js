const request = require('supertest')
const server = require('../../api/server')
const db = require('../../database/dbConfig')

/**
 * POST /api/auth/login
 *
 *  - username/password required
 *      - not found, HTTP 400
 *      - 'Missing arguments' msg
 *
 *  - username/password mismatch
 *      - HTTP 401
 *      - 'Invalid credentials' msg
 *
 *  - username/password match
 *      - HTTP 200
 *      - req.session ?
 */
describe('POST /api/auth/login', () => {
  const LOGIN_ENDPOINT = '/api/auth/login'

  describe('missing arguments (username + password)', () => {
    test('should return HTTP status code 400 with accompanying message', async () => {
      const missingArgumentsMsg = '`username` and `password` are both required!'
      const res = await request(server).post(LOGIN_ENDPOINT)
      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('error', missingArgumentsMsg)
    })
  })
})

/**
 * POST /api/auth/register
 * 
 *  - username/password missing
 *      - HTTP 400
 *      - 'Missing arguments' msg
 * 
 *  - successful creation
 *      - HTTP 201
 *      - new user
 *          - user.password !== req.body.password
 */
describe('POST /api/auth/register', () => {
  const REGISTER_ENDPOINT = '/api/auth/register'

  beforeEach(async () => { await db('users').truncate() })

  describe('user registration failure: missing arguments', () => {
    test('should return HTTP status code 400 with accompanying message', async () => {
      const missingArgumentsMsg = '`username` and `password` are both required!'
      const res = await request(server).post(REGISTER_ENDPOINT)
      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('error', missingArgumentsMsg)
    })
  })

  describe('user registration successful', () => {
    test('should return HTTP status code 201', async () => {
      const mockUser = { username: 'cedric', password: '12345' }
      const res = await request(server).post(REGISTER_ENDPOINT).send(mockUser)
      expect(res.status).toBe(201)
    })

    test('should return newly-created user with hashed password', async () => {
      const mockUser = { username: 'cedric', password: '12345' }
      const res = await request(server).post(REGISTER_ENDPOINT).send(mockUser)
      expect(res.body).toBeInstanceOf(Object)
      expect(res.body).toHaveProperty('username', mockUser.username)
      expect(res.body).toHaveProperty('password')
      expect(res.body).not.toHaveProperty('password', mockUser.password)
    })
  })
})
