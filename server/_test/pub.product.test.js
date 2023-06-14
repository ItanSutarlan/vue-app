const request = require("supertest");
const app = require("../app");
const UserTableTestHelper = require("../tests/userTableTestHelper");
const CategoryTableTestHelper = require("../tests/categoryTableTestHelper");
const ProductTableTestHelper = require("../tests/productTableTestHelper");

const customerTest = {
  email: "greg@gmail.com",
  password: "123456",
};

beforeAll(async () => {
  try {
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
    await UserTableTestHelper.cleanTable();
  } catch (error) {
    console.error(error);
  }
});

describe("/api/pub/products endpoint", () => {
  describe("when GET /api/pub/products", () => {
    it("should response 200 and all products", async () => {
      const expected = {
        price: "100,00 €",
        id: 2,
        name: "Jetpulse",
        description: "Resection of Glomus Jugulare, Open Approach",
        stock: 39,
        imgUrl:
          "https://media1.popsugar-assets.com/files/thumbor/47Zhpci-cr8mtdYDItBWNK3VtlU/1x0:1499x1498/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/09/09/941/n/1922564/2e50af8d5d76c599488078.11764855_/i/HM-New-Fall-Products-2019.jpg",
        categoryId: 2,
        authorId: 1,
        status: "Active",
      };

      const response = await request(app)
        .get("/api/pub/products")
        .set("Accept", "application/json");

      const body = response.body;
      expect(response.status).toEqual(200);
      expect(body.count).toEqual(21);
      expect(body.data).toBeInstanceOf(Array);
      expect(body.data).toHaveLength(21);
      expect(body.data).toEqual(
        expect.arrayContaining([expect.objectContaining(expected)])
      );
    });

    it("should response 200 and the filtered products", async () => {
      const response = await request(app)
        .get("/api/pub/products?filter[category]=1,2")
        .set("Accept", "application/json");

      const body = response.body;
      expect(response.status).toEqual(200);
      expect(body.count).toEqual(6);
      expect(body.data).toBeInstanceOf(Array);
      expect(body.data).toHaveLength(6);
    });
  });

  describe("when GET /api/pub/products/:id", () => {
    it("should response 200 when product id is found", async () => {
      const response = await request(app)
        .get("/api/pub/products/2")
        .set("Accept", "application/json");

      const body = response.body;
      expect(response.status).toEqual(200);
      expect(body.statusCode).toEqual(200);
      expect(body.data).toBeInstanceOf(Object);
      expect(body.data).toEqual(
        expect.objectContaining({
          price: "100,00 €",
          id: 2,
          name: "Jetpulse",
          description: "Resection of Glomus Jugulare, Open Approach",
          stock: 39,
          imgUrl:
            "https://media1.popsugar-assets.com/files/thumbor/47Zhpci-cr8mtdYDItBWNK3VtlU/1x0:1499x1498/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/09/09/941/n/1922564/2e50af8d5d76c599488078.11764855_/i/HM-New-Fall-Products-2019.jpg",
          categoryId: 2,
          authorId: 1,
          status: "Active",
        })
      );
      expect(body.data.barcode).toBeDefined();
    });

    it("should response 404 when id is not found", async () => {
      const response = await request(app)
        .get("/api/pub/products/400")
        .set("Accept", "application/json");

      const body = response.body;
      expect(response.status).toEqual(404);
      expect(body).toEqual({
        statusCode: 404,
        message: "Id is not found",
      });
    });
  });
});
