# API Docs

The base URL is: `https://branded-items-production.up.railway.app/api`.

## Basic usage

API requests should be prefixed with base URL and followed by your selected endpoint. For example, if you want to access endpoint categories, you could access `https://branded-items-production.up.railway.app/api/categories`.

Example of a valid API request using cURL:

```shell
curl "https://branded-items-production.up.railway.app/api/categories"
```

## Endpoints

List of Available Endpoints:

- `POST /register`
- `POST /login`
- `POST /login-google-credential`
- `POST /login-google-token`
- `POST /products`
- `GET /products`
- `GET /products/histories`
- `PUT /products/:id`
- `GET /products/:id`
- `PATCH /products/:id`
- `DELETE /products/:id`
- `POST /categories`
- `GET /categories`
- `PUT /categories/:id`
- `DELETE /categories/:id`
- `POST /pub/register`
- `POST /pub/login`
- `POST /pub/login-google-credential`
- `GET /pub/products/:id`
- `GET /pub/mywishlist`
- `POST /pub/mywishlist`
- `DELETE /pub/mywishlist`

### POST /register

#### Description

- Create a new user data

#### Request

- Headers
  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded"
  }
  ```
- Body
  ```json
  {
    "username": String,
    "email": String,
    "password": String,
    "phoneNumber": String,
    "address": String,
  }
  ```

#### Response

_201 - Created_

- Body
  ```json
  {
    "statusCode": Integer,
    "message": String,
    "data": {
        "id": Integer,
        "email": String
    }
  }
  ```

_400 - Bad Request_

- Body
  ```json
  {
    "statusCode": 400,
    "message": Array
  }
  ```

### POST /login

#### Description

- Sign in with user data

#### Request

- Headers
  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded"
  }
  ```
- Body
  ```json
  {
    "email": String,
    "password": String,
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "statusCode": Integer,
    "message": String,
    "data": {
        "access_token": String,
        "username": String,
        "role": String,
    }
  }
  ```

_401 - Unauthorized_

- Body
  ```json
  {
    "statusCode": 401,
    "message": String
  }
  ```

### POST /login-google-credential

#### Description

- Sign in with google credential

#### Request

- Headers
  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded"
  }
  ```
- Body
  ```json
  {
    "credential": String,
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "statusCode": Integer,
    "message": String,
    "data": {
        "access_token": String,
        "username": String,
        "role": String,
    }
  }
  ```

### POST /login-google-token

#### Description

- Sign in with google access token

#### Request

- Headers
  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded"
  }
  ```
- Body
  ```json
  {
    "token": String,
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "statusCode": Integer,
    "message": String,
    "data": {
        "access_token": String,
        "username": String,
        "role": String,
    }
  }
  ```

### POST /products

#### Description

- Create a new product data

#### Request

- Headers
  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded",
    "access_token": String
  }
  ```
- Body
  ```json
  {
    "name": String,
    "description": String,
    "price": Integer,
    "stock": Integer,
    "imgUrl": String,
    "categoryId": Integer,
  }
  ```

#### Response

_201 - Created_

- Body
  ```json
  {
    "statusCode": 201,
    "message": "Product created successfully",
    "data": {
      "id": Integer,
      "name": String,
      "description": String,
      "price": Integer,
      "stock": Integer,
      "imgUrl": String,
      "categoryId": Integer,
      "authorId": Integer,
      "updatedAt": Date,
      "createdAt": Date,
      "User": Object,
    }
  }
  ```

_400 - Bad Request_

- Body
  ```json
  {
    "statusCode": 400,
    "messages": Array
  }
  ```

_401 - Unauthorized_

- Body
  ```json
  {
    "statusCode": 401,
    "message": String
  }
  ```

### GET /products

#### Description

- You can get all the products data, get products filtered by category using query params eg: <base_url>/products/?filter[category]=1,2.
  You can also get products with pagination using query params eg: <base_url>/products/?page[size]=2&page[number]=1

#### Request

- Headers
  ```json
  {
    "access_token": String
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
  {
    "statusCode": 200,
    "count": Integer,
    "data": [
      {
        "id": Integer,
        "name": String,
        "description": String,
        "price": Integer,
        "stock": Integer,
        "imgUrl": String,
        "categoryId": Integer,
        "authorId": Integer,
        "updatedAt": Date,
        "createdAt": Date,
        "User": Object,
      },
      ...
    ]
  }
  ```

_401 - Unauthorized_

- Body
  ```json
  {
    "statusCode": 401,
    "message": String
  }
  ```

### GET /products/histories

#### Description

- Get all the histories of products data

#### Request

- Headers
  ```json
  {
    "access_token": String
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
  {
    "statusCode": 200,
    "data": [
      {
        "id": Integer,
        "name": String,
        "description": String,
        "updatedBy": String,
        "updatedAt": Date,
        "createdAt": Date,
      },
      ...
    ]
  }
  ```

  _401 - Unauthorized_

- Body
  ```json
  {
    "statusCode": 401,
    "message": String
  }
  ```

### PUT /products/:id

#### Description

- Update product by id

#### Request

- Headers

  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded",
    "access_token": String
  }
  ```

- Body
  ```json
  {
    "name": String,
    "description": String,
    "price": Integer,
    "stock": Integer,
    "imgUrl": String,
    "categoryId": Integer,
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "statusCode": 200,
    "message": "Product updated successfully"
  }
  ```

_400 - Bad Request_

- Body
  ```json
  {
    "statusCode": 400,
    "messages": Array
  }
  ```

_404 - Not Found_

- Body
  ```json
  {
    "statusCode": 404,
    "message": "Id is not found"
  }
  ```

_401 - Unauthorized_

- Body
  ```json
  {
    "statusCode": 401,
    "message": String
  }
  ```

_403 - Forbidden_

- Body
  ```json
  {
    "statusCode": 403,
    "message": String
  }
  ```

### GET /products/:id

#### Description

- Get product data by id

#### Request

- Headers
  ```json
  {
    "access_token": String
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "statusCode": 200,
    "data":
      {
        "id": Integer,
        "name": String,
        "description": String,
        "price": String,
        "stock": Integer,
        "imgUrl": String,
        "categoryId": Integer,
        "authorId": Integer,
        "barcode": Svg,
        "updatedAt": Date,
        "createdAt": Date
      }
  }
  ```

_404 - Not Found_

- Body

  ```json
  {
    "statusCode": 404,
    "message": "Id is not found"
  }
  ```

_401 - Unauthorized_

- Body
  ```json
  {
    "statusCode": 401,
    "message": String
  }
  ```

### PATCH /products/:id

#### Description

- Change a product status based on given id

#### Request

- Headers

  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded",
    "access_token": String
  }
  ```

- Body
  ```json
  {
    "status": String,
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
  "statusCode": 200,
  "message": "Product status with id {id} updated successfully"
  }
  `
  ```

_404 - Not Found_

- Body
  ```json
  {
    "statusCode": 404,
    "message": "Id is not found"
  }
  ```

_401 - Unauthorized_

- Body
  ```json
  {
    "statusCode": 401,
    "message": String
  }
  ```

_403 - Forbidden_

- Body
  ```json
  {
    "statusCode": 403,
    "message": String
  }
  ```

### DELETE /products/:id

#### Description

- Remove a product data based on given id

#### Request

- Headers
  ```json
  {
    "access_token": String
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
  "statusCode": 200,
  "message": "Product {id} deleted successfully"
  }
  `
  ```

_404 - Not Found_

- Body
  ```json
  {
    "statusCode": 404,
    "message": "Id is not found"
  }
  ```

_401 - Unauthorized_

- Body
  ```json
  {
    "statusCode": 401,
    "message": String
  }
  ```

_403 - Forbidden_

- Body
  ```json
  {
    "statusCode": 403,
    "message": String
  }
  ```

### POST /categories

#### Description

- Create a new category data

#### Request

- Headers

  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded",
    "access_token": String
  }
  ```

- Body
  ```json
  {
    "name": String,
  }
  ```

#### Response

_201 - Created_

- Body
  ```json
  {
    "statusCode": 201,
    "message": "Category created successfully",
    "data": {
        "id": Integer,
        "name": String,
        "updatedAt": Date,
        "createdAt": Date,
    }
  }
  ```

_400 - Bad Request_

- Body

  ```json
  {
    "statusCode": 400,
    "messages": Array
  }
  ```

_401 - Unauthorized_

- Body
  ```json
  {
    "statusCode": 401,
    "message": String
  }
  ```

### PUT /categories/id

#### Description

- Update category by id

#### Request

- Headers

  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded",
    "access_token": String
  }
  ```

- Body
  ```json
  {
    "name": String,
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "statusCode": 200,
    "message": "Category updated successfully"
  }
  ```

_400 - Bad Request_

- Body
  ```json
  {
    "statusCode": 400,
    "messages": Array
  }
  ```

_404 - Not Found_

- Body
  ```json
  {
    "statusCode": 404,
    "message": "Id is not found"
  }
  ```

_401 - Unauthorized_

- Body
  ```json
  {
    "statusCode": 401,
    "message": String
  }
  ```

### GET /categories

#### Description

- Get all the categories data

#### Request

- Headers
  ```json
  {
    "access_token": String
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "statusCode": 200,
    "count": Integer,
    "data": [
      {
          "id": Integer,
          "name": String,
          "createdAt": Date,
          "updatedAt": Date
      },
      ...
    ]
  }
  ```

_401 - Unauthorized_

- Body
  ```json
  {
    "statusCode": 401,
    "message": String
  }
  ```

### DELETE /categories/:id

#### Description

- Remove a category data based on given id

#### Request

- Headers
  ```json
  {
    "access_token": String
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "statusCode": 200,
    "message": "Category {id} deleted successfully"
  }
  `
  ```

_401 - Unauthorized_

- Body
  ```json
  {
    "statusCode": 401,
    "message": String
  }
  ```

_404 - Not Found_

- Body
  ```json
  {
    "statusCode": 404,
    "message": "Id is not found"
  }
  ```

### POST /pub/register

#### Description

- Create a new customer data

#### Request

- Headers
  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded"
  }
  ```
- Body
  ```json
  {
    "email": String,
    "password": String,
  }
  ```

#### Response

_201 - Created_

- Body
  ```json
  {
    "statusCode": Integer,
    "message": String,
    "data": {
        "id": Integer,
        "email": String
    }
  }
  ```

_400 - Bad Request_

- Body
  ```json
  {
    "statusCode": 400,
    "message": Array
  }
  ```

### POST /pub/login

#### Description

- Sign in with customer data

#### Request

- Headers
  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded"
  }
  ```
- Body
  ```json
  {
    "email": String,
    "password": String,
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "statusCode": Integer,
    "message": String,
    "data": {
        "access_token": String,
        "email": String,
        "role": String,
    }
  }
  ```

_401 - Unauthorized_

- Body
  ```json
  {
    "statusCode": 401,
    "message": String
  }
  ```

### POST /pub/login-google-credential

#### Description

- Sign in with google credential

#### Request

- Headers
  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded"
  }
  ```
- Body
  ```json
  {
    "credential": String,
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "statusCode": Integer,
    "message": String,
    "data": {
        "access_token": String,
        "email": String,
        "role": String,
    }
  }
  ```

### GET /pub/products/:id

#### Description

- Get product data by id

#### Request

--

#### Response

_200 - OK_

- Body
  ```json
  {
    "statusCode": 200,
    "data":
      {
        "id": Integer,
        "name": String,
        "description": String,
        "price": String,
        "stock": Integer,
        "imgUrl": String,
        "categoryId": Integer,
        "authorId": Integer,
        "barcode": Svg,
        "updatedAt": Date,
        "createdAt": Date
      }
  }
  ```

_404 - Not Found_

- Body

  ```json
  {
    "statusCode": 404,
    "message": "Id is not found"
  }
  ```

_401 - Unauthorized_

- Body
  ```json
  {
    "statusCode": 401,
    "message": String
  }
  ```

### GET /pub/mywishlist

#### Description

- Get all wishlist products owned by user

#### Request

- Headers
  ```json
  {
    "access_token": String
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
  {
    "statusCode": 200,
    "data": [
      {
        "id": Integer,
        "customerId": Integer,
        "description": String,
        "Product": Object,
        "updatedAt": Date,
        "createdAt": Date,
      },
      ...
    ]
  }
  ```

  _401 - Unauthorized_

- Body
  ```json
  {
    "statusCode": 401,
    "message": String
  }
  ```

### POST /pub/mywishlist

#### Description

- Add a new product data to my wishlist

#### Request

- Headers
  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded",
    "access_token": String
  }
  ```
- Body
  ```json
  {
    "productId": Integer,
  }
  ```

#### Response

_201 - Created_

- Body
  ```json
  {
    "statusCode": 201,
    "message": "Product successfully added to wishlist"
  }
  ```

_400 - Bad Request_

- Body
  ```json
  {
    "statusCode": 400,
    "messages": Array
  }
  ```

_401 - Unauthorized_

- Body
  ```json
  {
    "statusCode": 401,
    "message": String
  }
  ```

_404 - Not Found_

- Body
  ```json
  {
    "statusCode": 404,
    "message": "Id is not found"
  }
  ```

### DELETE /pub/mywishlist/:productId

#### Description

- Remove a product data based on given id from my wishlist

#### Request

- Headers
  ```json
  {
    "access_token": String
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
  "statusCode": 200,
  "message": String
  }
  `
  ```

_404 - Not Found_

- Body
  ```json
  {
    "statusCode": 404,
    "message": "Id is not found"
  }
  ```

_401 - Unauthorized_

- Body
  ```json
  {
    "statusCode": 401,
    "message": String
  }
  ```

### Global Error

#### Response

_500 - Internal Server Error_

- Body
  ```json
  {
    "statusCode": 500,
    "message": "Internal error server"
  }
  ```
