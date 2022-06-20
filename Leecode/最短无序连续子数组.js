/**
 * @param {number[]} nums
 * @return {number}
 */
 var findUnsortedSubarray = function(nums) {
    if(!nums.length || nums.length === 1){
        return 0
    }
    let left = 0,max = 0, right = nums.length-1,flag1 = false, flag2 = false
    while(left<nums.length){
        if( nums[left]>nums[max]){
            max = left
        }
        if(left>=1 && nums[left] < nums[left-1]){
            //出现降序，找出左边数组列中，当前值应该放位置作为起始位置
            // 从后往前找
            for(let j=nums.slice(0,left).length-1;j>=0;j--){
                if(nums[j]<nums[left] || nums[j] === nums[left]){
                    left = j+1
                    flag1 = true
                    break
                }
            }
            if(flag1){
                break
            }
        }
        left++
    }


    if(!flag1){
        return 0
    }

    while(right>=1 && nums[right] >= nums[right-1]){
        if(nums[right] < nums[max] || right<= left+1){
            flag2 = true
            break
        }else{
            right--
        }
    }

    console.log('======111',right)
    return right-left + 1
};

console.log(findUnsortedSubarray([1,2,4,5,3]))
