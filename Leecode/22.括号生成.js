// // /**
// //  * 有效的括号
// //  * 1、任意前缀 “（” 数量 >= "）"数量
// //  * 2、左右括号数量相等
// //  */

// // /**
// //  * @param {number} n
// //  * @return {string[]}
// //  */
// //  var generateParenthesis = function(n) {
// //     if(!n){
// //         return ''
// //     }
// //     if(n === 1){
// //         return '()'
// //     }
// //     const res = []
// //     dfs(0,0, n, '', res)
// // };
// // /**
// //  * 
// //  * @param {*} lc 左括号数量 
// //  * @param {*} rc 右括号数量
// //  * @param {*} n 括号数量
// //  * @param {*} seq 当前结果
// //  * @param {*} res 最后的结果
// //  */
// // function dfs(lc, rc,n, seq, res){
// //     if(lc === n && rc === n){
// //         res.push(seq)
// //         return 
// //     }

// //     if(lc < n){
// //         dfs(lc+1, rc, n, seq+'(', res)
// //     }
// //     if(rc<n && lc>rc){
// //         dfs(lc, rc+1, n, seq + ')', res)
// //     }
// // }

// var longestConsecutive = function(nums) {
//     if(!nums.length){
//         return 0
//     }

//     nums = [...new Set(nums.sort((a,b)=>a-b))]
//     let max = len = 1
//     let left = 0, right = 0
//     for(let i=1;i<nums.length;i++){
//         if(nums[i]-nums[i-1] === 1){
//             right = i
//         }else {
//             if(max< right-left+1){
//                 max = right-left +1
//             }
//             left = right = i
//         }
//     }

//     if(max< right-left+1){
//         max = right-left +1
//     }
//     return max
// };

// console.log(longestConsecutive([0,-1]))

var permute = function(nums) {

    if(!nums.length){
        return []
    }
    const res = []
    dfs(nums.length,nums, [], res)
    return res
};

function dfs(resLen,remains,preValue, res){
    if(resLen === preValue.length){
        res.push(preValue)
        return 
    }

    const len = remains.length
    for(let i=0;i<len;i++){
        const target = remains.splice(i,1)
        dfs(resLen, remains,[...preValue,target[0]], res)
        remains.splice(i,0,target[0])
    }
}

console.log(permute([1,2,3]))