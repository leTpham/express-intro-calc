const { BadRequestError } = require("./expressError");


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  // if the conversion isn't successful, throw a BadRequestError and will
  // be handled in your route
  if (strNums.some(n => isNaN(Number(n)))) {
    throw new BadRequestError(`${n} is not a number`);
  }

  return strNums.map(el => Number(el));
}



module.exports = { convertStrNums };