
const supertest = require('supertest')
const app = require('../../server')
const request = supertest(app)




describe('show courses ',  function() {
    it('Get /show-courses', async () => {
        const res = await request.get('/show-courses')
        expect(res.status).toBe(200)
    })
});