
const supertest = require('supertest')
const app = require('../../server')
const request = supertest(app)

it('Get /show-students', async () => {
    const res = await request.get('/show-students')
    expect(res.status).toBe(200)
})