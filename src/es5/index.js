"use strict";
$(document).ready(function () {
    /**
     * 求和
     * @param nums
     * @example sum(1,2,3) //6
     */
    function sum() {
        var nums = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            nums[_i] = arguments[_i];
        }
        return nums.reduce(function (pre, cur) { return pre + cur; });
    }
    console.log(sum(1, 2, 3, 4, 5));
});
