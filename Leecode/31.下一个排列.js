/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
 var nextPermutation = function(nums) {
    if(!nums.length || nums.length === 1){
        return nums
    }
    let flag = false
    for(let i=nums.length-2; i>=0;i--){
        if(nums[i]< nums[i+1]){
            flag = true
            let exchange = i+1

            for(let j=i+1;j<nums.length;j++){
                if(nums[j]>nums[i] && nums[j]<nums[exchange]){
                    exchange = j
                }
            }

            const tag = nums[i]
            nums[i] = nums[exchange]
            nums[exchange] = tag
            nums = [...nums.slice(0,i),nums[i],...nums.slice(i+1).reverse()]
            break
        }
    }

    console.log('=====',nums)
    if(!flag){
        return nums.reverse()
    }
    return nums
};

console.log(nextPermutation([1,3,2]))