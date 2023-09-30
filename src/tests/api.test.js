const request = require("supertest")
const app = require("../app")

it("responde con json y contiene una lista de usuarios", done => {
    request(app)
        .get("/users/")
        .set("Aceptado", "application/json")
        .expect("Content-Type", /json/)
        .expect(200, done)
        .then((res) => {
            expect(res.body).to.have.property('usuarios');
            // expect(res.body).to.have.property('ecdsa_fingerprint');
        });

})

describe("GET / users /: id", () => {
    it("Respuesta cuando llamo por id", (done) => {
        request(app)
            .get("/users/U001")
            .set("Aceptado", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, done)
            .then((res) => {
                expect(res.body).to.have.property('usuario');
                // expect(res.body).to.have.property('ecdsa_fingerprint');
            });
    });

    it("Respuesta cuando llamo por id y no funciona", (done) => {
        request(app)
            .get("/users/afdfdf")
            .set("Aceptado", "application/json")
            .expect("Content-Type", /json/)
            .expect(404, done)
            .then((res) => {
                expect(res.body).to.have.property('message');
                // expect(res.body).to.have.property('ecdsa_fingerprint');
            });
    });
});

describe("POST /users", () => {
    it('TEST 05 usuario creado', done => {
        const data = {
            username: 'admin',
            password: 'admin01'
        }

        request(app)
            .post('/users')
            .send(data)
            .set("Aceptado", "application/json")
            .expect("Content-Type", /json/)
            .expect(201, done)
            .then((res) => {
                expect(res.body).to.have.property('message');
                // expect(res.body).to.have.property('ecdsa_fingerprint');
            });
    });

    it('TEST 06 usuario no creado', done => {
        const data = {};
        request(app)
            .post('/users')
            .send(data)
            .set("Aceptado", "application/json")
            .expect("Content-Type", /json/)
            .expect(400, done)
            .then((res) => {
                expect(res.body).to.have.property('message');
                // expect(res.body).to.have.property('ecdsa_fingerprint');
            });
    });

});

describe("DELETE /users", () => {
    it('TEST 07 usuario eliminado', done => {
        request(app)
            .delete('/users/U001')
            .set("Aceptado", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, done)
            .then((res) => {
                expect(res.body).to.have.property('message');
                // expect(res.body).to.have.property('ecdsa_fingerprint');
            });
    });

    it('TEST 08 usuario no encontrado para eliminar', done => {
        request(app)
            .delete('/users/1212')
            .set("Aceptado", "application/json")
            .expect("Content-Type", /json/)
            .expect(404, done)
            .then((res) => {
                expect(res.body).to.have.property('message');
                // expect(res.body).to.have.property('ecdsa_fingerprint');
            });
    });

});

module.exports = app;