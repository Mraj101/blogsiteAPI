const ratingModels = require("../../../models/ratings.models");
const { ApiError } = require("../../../utils/ApiError");

async function create(data) {
  try {
     console.log(data,"ratings");
    const { ratings } = data;
    console.log(ratings,"data extract");
    const ratingsInstance = await ratingModels.create({
      ratings
    });
    console.log(ratingsInstance,"ratingInstance");
    const createdRating = {
      ratings: ratingsInstance.ratings,
    };
    return createdRating;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    } else {
      console.log(error);
      throw new ApiError(500, "ratings service error");
    }
  }
}

module.exports = { create };
