/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number}
 */
 let num = 0
 var pathSum = function(root, targetSum) {
     if(!root){
         return 0
     }
     num = 0
     dfs(root, targetSum, 0)
     return num
 };
 function dfs(root, targetSum, preSum){
     if(preSum === targetSum){
         num++
     }
     if(!root){
         return 
     }
     if(preSum<targetSum){
         dfs(root.right, targetSum, preSum + root.val)
         dfs(root.right, targetSum, preSum + root.val)
     }
     dfs(root.left, targetSum, 0)
     dfs(root.right, targetSum, 0)
 }
console.log(pathSum())