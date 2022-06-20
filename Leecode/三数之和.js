/**
 * @param {number[]} nums
 * @return {number[][]}
 * 双指针，
 * 1、先排序
 * 2、当前的值和左右相加，如果之前的值和当前的值是一样的，就跳过，去重
 * 
 */
 var threeSum = function(nums) {
    if(!nums.length){
        return []
    }
    nums.sort((a,b)=>a-b)
    const res = []
    for(let i=0;i<nums.length-1;i++){
        if(i>0 && nums[i] === nums[i-1]) continue
        let left = i+1,right = nums.length -1
        while(left<right){
            if((nums[i] + nums[left] + nums[right]) === 0){
                res.push([nums[i], nums[left], nums[right]])
                while(left< right && nums[left] === nums[left+1]) left++
                while(left< right && nums[right-1] === nums[right]) right--
                left++
                right--
            }else if((nums[i] + nums[left] + nums[right]) < 0){
                left++
            }else{
                right--
            }
        }

    }
    return res
};

console.log(threeSum([-1,0,1,2,-1,-4]))