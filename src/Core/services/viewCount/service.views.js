const { ApiError } = require("../../../utils/ApiError");
const countModels = require("../../../models/count.models");
const mongoose = require("mongoose");

async function update(data) {
  try {
    // console.log(data.body, "views");
    let { id } = data.params;
    // console.log(id, "data extract");
    const existCountdoc = await countModels.find({ blogId: id });

    console.log(existCountdoc, "exist count doc");

    if (!existCountdoc.length > 0) {
      const viewcountInstance = {
        blogId: id,
        count: 1,
      };
      // console.log(viewcountInstance, "TEST");
      const saved = await countModels.create(viewcountInstance);
      // console.log(saved.count, "Count value");
    } else {
      let countDocMatch = existCountdoc.find((singleDoc) => {
        console.log(singleDoc, "doc");
        console.log(id);
        return id === singleDoc.blogId.toString();
      });
      console.log("doc matched", countDocMatch);
      let countVal = parseInt(countDocMatch.count);
      // console.log(countVal, "value of count");
      const updatedDoc = await countModels.findOneAndUpdate(
        countDocMatch._id,
        {
          $set: { count: countVal + 1 },
        },
        { new: true }
      );

      // console.log(updatedDoc, "update");
    }

    // const createdCountview = {
    //   count: viewcountInstance.count,
    // };

    return {};
  } catch (error) {
    console.log(error);
    if (error instanceof ApiError) {
      throw error;
    } else {
      console.log(error);
      throw new ApiError(500, "count view service error");
    }
  }
}


async function get(data) {
  try {
  //  console.log("hi get pop blog views")
  const allViews = await countModels.find({});
  const pop = allViews.sort((a,b)=>b.count-a.count);
  console.log(pop,"pop");
  
  // console.log(allViews[0].hasOwnProperty('count'),"counts")
  // console.log(allViews[0].count,"countval")

// console.log(popular, "populars");
   return pop
  } catch (error) {
    console.log(error);
    if (error instanceof ApiError) {
      throw error;
    } else {
      console.log(error);
      throw new ApiError(500, "count view service error");
    }
  }
}


module.exports = { update,get };
