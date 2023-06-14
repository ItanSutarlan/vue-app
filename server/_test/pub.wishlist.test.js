const request = require("supertest");
const app = require("../app");
const TokenManager = require("../helpers/tokenManager");
const UserTableTestHelper = require("../tests/userTableTestHelper");
const CustomerTableTestHelper = require("../tests/customerTableTestHelper");
const CategoryTableTestHelper = require("../tests/categoryTableTestHelper");
const ProductTableTestHelper = require("../tests/productTableTestHelper");
const WishlistTableTestHelper = require("../tests/wishlistTableTestHelper");

let validToken;
const invalidToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIwMUBtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE2MjI2MDk2NTF9.gShAB2qaCUjlnvNuM1MBWfBVEjDGdqjWSJNMEScXIeE";

const customerTest = {
  email: "greg@gmail.com",
  password: "123456",
};

beforeAll(async () => {
  try {
    const customer = await CustomerTableTestHelper.addCustomer(customerTest);
    validToken = TokenManager.generateToken({
      id: customer.id,
      email: customer.email,
    });

    const userTest = require("../data/users.json");
    await UserTableTestHelper.addUsers(userTest);

    const categoryTest = require("../data/categories.json");
    await CategoryTableTestHelper.addCategories(categoryTest);

    const productTest = require("../data/products.json");
    await ProductTableTestHelper.addProducts(productTest);
  } catch (error) {
    console.error(error);
  }
});

afterAll(async () => {
  try {
    await ProductTableTestHelper.cleanTable();
    await CategoryTableTestHelper.cleanTable();
    await CustomerTableTestHelper.cleanTable();
    await UserTableTestHelper.cleanTable();
  } catch (error) {
    console.error(error);
  }
});

describe("/api/pub/mywishlist endpoint", () => {
  describe("when POST /api/pub/mywishlist", () => {
    afterEach(async () => {
      try {
        await WishlistTableTestHelper.cleanTable();
      } catch (error) {
        console.error(error);
      }
    });

    it("should response 201 if headers access_token is valid and product is available", async () => {
      const response = await request(app)
        .post("/api/pub/mywishlist")
        .send({ productId: 2 })
        .set("access_token", validToken)
        .set("Accept", "application/json");

      const body = response.body;
      expect(response.status).toEqual(201);
      expect(body.statusCode).toEqual(201);
      expect(body.message).toBeDefined();
    });

    it("should response 401 if headers access_token is not valid", async () => {
      const response = await request(app)
        .post("/api/pub/mywishlist")
        .send({ productId: 2 })
        .set("access_token", invalidToken)
        .set("Accept", "application/json");

      expect(response.status).toEqual(401);
      expect(response.body).toEqual({
        statusCode: 401,
        message: "Invalid token",
      });
    });

    it("should response 404 if product id is not available in database", async () => {
      const response = await request(app)
        .post("/api/pub/mywishlist")
        .send({ productId: 200 })
        .set("access_token", validToken)
        .set("Accept", "application/json");

      const body = response.body;
      expect(response.status).toEqual(404);
      expect(body.statusCode).toEqual(404);
      expect(body.message).toBeDefined();
    });
  });

  describe("when GET /api/pub/mywishlist", () => {
    beforeAll(async () => {
      try {
        await WishlistTableTestHelper.addWishlist({ productId: 2 });
        await WishlistTableTestHelper.addWishlist({ productId: 3 });
      } catch (error) {
        console.error(error);
      }
    });
    afterAll(async () => {
      try {
        await WishlistTableTestHelper.cleanTable();
      } catch (error) {
        console.error(error);
      }
    });

    it("should response 200 with data length 2", async () => {
      const response = await request(app)
        .get("/api/pub/mywishlist")
        .set("access_token", validToken)
        .set("Accept", "application/json");

      const body = response.body;
      expect(response.status).toEqual(200);
      expect(body.statusCode).toEqual(200);
      expect(body.data).toBeInstanceOf(Array);
      expect(body.data).toHaveLength(2);
    });

    it("should response 401 when user is not login yet", async () => {
      const response = await request(app)
        .get("/api/pub/mywishlist")
        .set("Accept", "application/json");

      expect(response.status).toEqual(401);
      expect(response.body).toEqual({
        statusCode: 401,
        message: "Invalid token",
      });
    });

    it("should response 401 if headers access_token is not valid", async () => {
      const response = await request(app)
        .get("/api/pub/mywishlist")
        .set("access_token", invalidToken)
        .set("Accept", "application/json");

      expect(response.status).toEqual(401);
      expect(response.body).toEqual({
        statusCode: 401,
        message: "Invalid token",
      });
    });
  });
});
