const app = require("../index");
const chai = require("chai");
const chaiHttp = require("chai-http");
const {expect} = chai;
chai.use(chaiHttp);

const book_url = "/api/books";
let book_id, book_id_2 = "";


describe("Initial test!", () => {
    it("Send message for default URL", done => {
        chai
            .request(app)
            .get("/")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.message).to.equals("Hello World with Express");
                done();
            });
    });

    it("Test api url", done => {
        chai
            .request(app)
            .get("/api")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.message).to.equals("Welcome to Library!");
                done();
            });
    });
})

describe("[ POST ] book api", () => {

    it("Create Book 1", done => {
        chai
            .request(app)
            .post(book_url)
            .send({
                title: "Happily ever after",
                borrower: "Daniel",
                borrower_email: "Daniel@gmail.com",
                borrower_phone: "92131418"
            })
            .end((err, res) => {
                // Set book id for testing later
                book_id = res.body.data._id;
                expect(res).to.have.status(200);
                expect(res.body.message).to.equals("New book created!");
                expect(res.body.data.title).to.equals("Happily ever after");
                expect(res.body.data.borrower).to.equals("Daniel");
                expect(res.body.data.borrower_email).to.equals("Daniel@gmail.com");
                expect(res.body.data.borrower_phone).to.equals("92131418");
                done();
            });
    });

    it("Create Book 2", done => {
        chai
            .request(app)
            .post(book_url)
            .send({
                title: "Nevermore", borrower: "Grace", borrower_email: "Grace@gmail.com", borrower_phone: "96879090"
            })
            .end((err, res) => {
                // Set book id for testing later
                book_id_2 = res.body.data._id;
                expect(res).to.have.status(200);
                expect(res.body.message).to.equals("New book created!");
                expect(res.body.data.title).to.equals("Nevermore");
                expect(res.body.data.borrower).to.equals("Grace");
                expect(res.body.data.borrower_email).to.equals("Grace@gmail.com");
                expect(res.body.data.borrower_phone).to.equals("96879090");
                done();
            });
    });
})

describe("[ GET ] book api", () => {
    it("Get all books", done => {
        chai
            .request(app)
            .get(book_url)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.status).to.equals("success");
                expect(res.body.message).to.equals("Books retrieved successfully");
                done();
            });
    });

    it("Get book detail - wrong book id", done => {
        // Get book 1 detail
        chai
            .request(app)
            .get(book_url + '/' + "123")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.message).to.equals("Book cannot be found. Book id may not exist.");
                done();
            });
    });

    it("Get book 1 detail", done => {
        // Get book 1 detail
        chai
            .request(app)
            .get(book_url + '/' + book_id)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.message).to.equals("Book details loading..");
                expect(res.body.data.title).to.equals("Happily ever after");
                expect(res.body.data.borrower).to.equals("Daniel");
                expect(res.body.data.borrower_email).to.equals("Daniel@gmail.com");
                expect(res.body.data.borrower_phone).to.equals("92131418");
                done();
            });
    });

    it("Get book 2 detail", done => {
        // Get book 2 detail
        chai
            .request(app)
            .get(book_url + '/' + book_id_2)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.message).to.equals("Book details loading..");
                expect(res.body.data.title).to.equals("Nevermore");
                expect(res.body.data.borrower).to.equals("Grace");
                expect(res.body.data.borrower_email).to.equals("Grace@gmail.com");
                expect(res.body.data.borrower_phone).to.equals("96879090");
                done();
            });
    });
})

describe("[ PUT ] book api", () => {
    it("Update book 1 detail - No body", done => {
        chai
            .request(app)
            .put(book_url + '/' + book_id)
            .send({})
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.message).to.equals("Book title is required!");
                done();
            });
    });
    it("Update book 1 detail - No title", done => {
        chai
            .request(app)
            .put(book_url + '/' + book_id)
            .send({
                borrower: "Daisy", borrower_email: "Daisy@gmail.com", borrower_phone: "92345678"
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.message).to.equals("Book title is required!");
                done();
            });
    });

    it("Update book 1 detail - No borrower", done => {
        chai
            .request(app)
            .put(book_url + '/' + book_id)
            .send({
                title: "Twilight 2", borrower_phone: "92345678", borrower_email: "Daisy@gmail.com",

            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.message).to.equals("Borrower's name is required!");
                done();
            });
    });

    it("Update book 1 detail - No email", done => {
        chai
            .request(app)
            .put(book_url + '/' + book_id)
            .send({
                title: "Twilight 2", borrower: "Daisy", borrower_phone: "92345678"
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.message).to.equals("Borrower's email is required!");
                done();
            });
    });

    it("Update book 1 detail - No borrower phone", done => {
        chai
            .request(app)
            .put(book_url + '/' + book_id)
            .send({
                title: "Twilight 2", borrower: "Daisy", borrower_email: "Daisy@gmail.com",
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.message).to.equals("Book Info updated");
                expect(res.body.data.title).to.equals("Twilight 2");
                expect(res.body.data.borrower).to.equals("Daisy");
                expect(res.body.data.borrower_email).to.equals("Daisy@gmail.com");
                expect(res.body.data.borrower_phone).to.equals("92131418");
                done();
            });
    });

    it("Update book 2 detail", done => {
        chai
            .request(app)
            .put(book_url + '/' + book_id_2)
            .send({
                title: "Twilight 1", borrower: "Druke", borrower_email: "Druke@gmail.com", borrower_phone: "96879090"
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.data.title).to.equals("Twilight 1");
                expect(res.body.data.borrower).to.equals("Druke");
                expect(res.body.data.borrower_email).to.equals("Druke@gmail.com");
                expect(res.body.data.borrower_phone).to.equals("96879090");
                expect(res.body.message).to.equals("Book Info updated");
                done();
            });
    })
})

describe("[ DELETE ] book api", () => {
    it("Wrong Book ID test 1", done => {
        // Remove the first element
        chai
            .request(app)
            .delete(book_url + '/' + "")
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
    });

    it("Wrong Book ID test 2", done => {
        // Remove the first element
        chai
            .request(app)
            .delete(book_url + '/' + "123")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.message).to.equals("Book cannot be found. Book id may not exist.");
                done();
            });
    });

    it("Delete book 1", done => {
        // Remove the first element
        chai
            .request(app)
            .delete(book_url + '/' + book_id)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.status).to.equals("success");
                expect(res.body.message).to.equals("Book deleted");
                done();
            });
    });

    it("Delete book 2", done => {
        // Remove the first element
        chai
            .request(app)
            .delete(book_url + '/' + book_id_2)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.status).to.equals("success");
                expect(res.body.message).to.equals("Book deleted");
                done();
            });
    });
})