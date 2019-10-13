$(document).ready(() => {
  /**
   * 求和
   * @param nums
   * @example sum(1,2,3) //6
   */
  function sum(...nums: number[]) {
    return nums.reduce((pre: number, cur: number) => pre + cur);
  }
  console.log(sum(1, 2, 3, 4, 5));


});
