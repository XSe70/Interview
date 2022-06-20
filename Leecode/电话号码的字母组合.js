/**
 * @param {string} digits
 * @return {string[]}
 */
 const res = []
 var letterCombinations = function(digits) {
     if(!digits){
         return []
     }
     dfs(digits,0, '')
     return res
 };
 
 const nums = {
     '2': ['a','b','c'],
     '3':['d','e','f'],
     '4':['g','h','i'],
     '5':['j','k','l'],
     '6':['m','n','o'],
     '7':['p','q','r','s'],
     '8':['t','u','v'],
     '9':['w','x','y','z']
 }
 function dfs(digits,index,preValue){
     if(preValue.length === digits.length){
         res.push(preValue)
         return
     }
     const ch = digits[index]
     for(let i=0;i<nums[ch].length;i++){
         dfs(digits, index+1, preValue+nums[ch][i])
     }
 }

 console.log(letterCombinations("2"))