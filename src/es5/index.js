"use strict";

$(document).ready(function () {
    /**
     * 求和
     * @param nums
     * @example sum(1,2,3) //6
     */
    function sum() {
        for (var _len = arguments.length, nums = Array(_len), _key = 0; _key < _len; _key++) {
            nums[_key] = arguments[_key];
        }

        return nums.reduce(function (pre, cur) {
            return pre + cur;
        });
    }
    console.log(sum(1, 2, 3, 4, 5));
});