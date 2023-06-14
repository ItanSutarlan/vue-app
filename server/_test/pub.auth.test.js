const request = require("supertest");
const app = require("../app");
const CustomerTableTestHelper = require("../tests/customerTableTestHelper");

afterAll(async () => {
  await CustomerTableTestHelper.cleanTable();
});

describe("when POST /api/pub/register", () => {
  afterEach(async () => {
    await CustomerTableTestHelper.cleanTable();
  });

  it("should response 201 and persisted customer user", async () => {
    const requestPayload = {
      email: "dohok@gmail.com",
      password: "123456",
    };

    const response = await request(app)
      .post("/api/pub/register")
      .send(requestPayload)
      .set("Accept", "application/json");

    const body = response.body;
    expect(response.status).toEqual(201);
    expect(body.message).toBeDefined();
    expect(body.data).toBeInstanceOf(Object);
    expect(body.data).toEqual(
      expect.objectContaining({
        email: "dohok@gmail.com",
      })
    );
  });

  it("should response 400 when request payload not contain needed property email", async () => {
    const requestPayload = {
      password: "secret",
    };
    const response = await request(app)
      .post("/api/pub/register")
      .send(requestPayload)
      .set("Accept", "application/json");

    const body = response.body;
    expect(response.status).toEqual(400);
    expect(body.statusCode).toEqual(400);
    expect(body.message).toBeDefined();
  });

  it("should response 400 when request payload not contain needed property password", async () => {
    const requestPayload = {
      email: "dohok@gmail.com",
    };
    const response = await request(app)
      .post("/api/pub/register")
      .send(requestPayload)
      .set("Accept", "application/json");

    const body = response.body;
    expect(response.status).toEqual(400);
    expect(body.statusCode).toEqual(400);
    expect(body.message).toBeDefined();
  });

  it("should response 400 when request payload email is an empty string", async () => {
    const requestPayload = {
      email: "",
      password: "secret",
    };
    const response = await request(app)
      .post("/api/pub/register")
      .send(requestPayload)
      .set("Accept", "application/json");

    const body = response.body;
    expect(response.status).toEqual(400);
    expect(body.statusCode).toEqual(400);
    expect(body.message).toBeDefined();
  });

  it("should response 400 when request payload password is an empty string", async () => {
    const requestPayload = {
      email: "dohok@gmail.com",
      password: "",
    };
    const response = await request(app)
      .post("/api/pub/register")
      .send(requestPayload)
      .set("Accept", "application/json");

    const body = response.body;
    expect(response.status).toEqual(400);
    expect(body.statusCode).toEqual(400);
    expect(body.message).toBeDefined();
  });

  it("should response 400 when an email unavailable", async () => {
    const requestPayload = {
      email: "greg@gmail.com",
      password: "123456",
    };

    await CustomerTableTestHelper.addCustomer(requestPayload);

    const response = await request(app)
      .post("/api/pub/register")
      .send(requestPayload)
      .set("Accept", "application/json");

    const body = response.body;
    expect(response.status).toEqual(400);
    expect(body.statusCode).toEqual(400);
    expect(body.message).toBeDefined();
  });

  it("should response 400 when request payload email has an invalid format", async () => {
    const requestPayload = {
      email: "greg@",
      password: "123456",
    };

    const response = await request(app)
      .post("/api/pub/register")
      .send(requestPayload)
      .set("Accept", "application/json");

    const body = response.body;
    expect(response.status).toEqual(400);
    expect(body.statusCode).toEqual(400);
    expect(body.message).toBeDefined();
  });
});

describe("when POST /api/pub/login", () => {
  afterEach(async () => {
    await CustomerTableTestHelper.cleanTable();
  });

  it("should response 200, persisted customer and the access_token", async () => {
    const requestPayload = {
      email: "dohok@gmail.com",
      password: "123456",
    };

    await CustomerTableTestHelper.addCustomer(requestPayload);

    const response = await request(app)
      .post("/api/pub/login")
      .send(requestPayload)
      .set("Accept", "application/json");

    const body = response.body;
    expect(response.status).toEqual(200);
    expect(body.message).toBeDefined();
    expect(body.data).toBeInstanceOf(Object);
    expect(body.data).toEqual(
      expect.objectContaining({
        role: "Customer",
        email: "dohok@gmail.com",
        access_token: expect.any(String),
      })
    );
  });

  it("should response 401 when the password is wrong", async () => {
    const requestPayload = {
      email: "dohok@gmail.com",
      password: "123456",
    };

    await CustomerTableTestHelper.addCustomer(requestPayload);

    const response = await request(app)
      .post("/api/pub/login")
      .send({ email: requestPayload.email, password: "secret" })
      .set("Accept", "application/json");

    const body = response.body;
    expect(response.status).toEqual(401);
    expect(body.message).toBeDefined();
  });

  it("should response 401 when the user is unregistered", async () => {
    const requestPayload = {
      email: "dohok@gmail.com",
      password: "123456",
    };

    const response = await request(app)
      .post("/api/pub/login")
      .send({ email: requestPayload.email, password: "secret" })
      .set("Accept", "application/json");

    const body = response.body;
    expect(response.status).toEqual(401);
    expect(body.message).toBeDefined();
  });
});
