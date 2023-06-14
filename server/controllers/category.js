const { Category } = require("../models");

class CategoryController {
  static async postCategories(req, res, next) {
    try {
      const { name } = req.body;

      const category = await Category.create({
        name,
      });

      res.status(201).json({
        statusCode: 201,
        message: "Category created successfully",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }

  static async putCategoryById(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const categories = await Category.update(
        {
          name,
        },
        {
          where: {
            id,
          },
        }
      );

      if (!categories[0]) {
        throw new Error("NotFoundError");
      }

      res.status(200).json({
        statusCode: 200,
        message: "Category updated successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  static async getCategories(_, res, next) {
    try {
      const { count, rows: categories } = await Category.findAndCountAll();

      res.status(200).json({
        statusCode: 200,
        count,
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategoryById(req, res, next) {
    try {
      const { id } = req.params;
      const category = await Category.destroy({
        where: {
          id,
        },
      });

      if (!category) {
        throw new Error("NotFoundError");
      }

      res.status(200).json({
        statusCode: 200,
        message: `Category ${id} deleted successfully`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategoryController;
