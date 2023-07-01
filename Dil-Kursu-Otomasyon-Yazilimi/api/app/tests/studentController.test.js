const supertest = require('supertest')
const app = require('../../server')
const request = supertest(app)

/******* test for show all students ***********/
describe('Unit Test for students operations',() => {
    /****** get all students ****************/  
    it('Get /show-students', async () => {
        const res = await request.get('/show-students')
        expect(res.status).toBe(200)
    })

    /******* test for registerstudent ***********/
    it('başarlı öğrenci kaydı',async () => {
        const res = await request.post('/register-student')
            .send({
                name:'Ghyath',
                surname:'Moussa',
                tc:12345678982,
                phone:23428154968,
                address:'Istanbul'
            })
        expect(res.status).toBe(200)
    })

    it('başarız öğrenci kaydı',async () => {
        const res = await request.post('/register-student')
            .send({
                namee:'Ghyath',
                surnamee:'Moussa',
                tcr:12345678982,
                phonee:23428154968,
                addresse:'Istanbul'
            })
        expect(res.status).toBe(500)
    })

    /******* test for registerstudent ***********/
    it('başarlı öğrenci silme',async () => {
        const res = await request.post('/delete-student')
            .send({
                tc:12345678982,
            })
        expect(res.status).toBe(200)
    })

    it('başarlsız öğrenci silme',async () => {
        const res = await request.post('/delete-student')
            .send({
                tc:23334,
            })
        expect(res.status).toBe(500)
    })

    // öğrenci daha önce kaytlı ve taksit ödeme şklinde kaytlı olması gerekiyor
    /*
    it('öğrenciden ödeme alma testi', async() => {
        const res = await request.post('/get-installment')
            .send({
                tc:
            })
            expect(res.status).toBe(200)
    })
    */
})