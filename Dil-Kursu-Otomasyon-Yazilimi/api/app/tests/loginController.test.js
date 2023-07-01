

const supertest = require('supertest')
const app = require('../../server')
const request = supertest(app)

describe('login',  function() {
    it('responds with elaman_id', async function() {
       const reponse = await request.post('/login')
        .send({
            username:  "kayitelemani1",
            password: "kayitelemanisifre1",
          })
        expect(reponse.status).toBe(200)
    });
});

describe('hatali login',  function() {
  it('responds with elaman_id', async function() {
      const reponse = await request.post('/login')
      .send({
          username:  "hatali",
          password: "hatali",
        })
      expect(reponse.status).toBe(404)
  });
});