const supertest = require('supertest')
const app = require('../../server')
const request = supertest(app)

describe('Şubeler unit testi ',() => {
    it('bütün şubeler listele',async () =>{
        const res = await request.get('/show-branchs')
        expect(res.status).toBe(200)
    })
})

describe('şubedeki dersleri göster',() => {
    it('şubedeki dersleri göster', async () =>{
        const res = await request.post('/show-languages-branch')
            .send({
                branch_id:1
            })
        expect(res.status).toBe(200)
    })
})