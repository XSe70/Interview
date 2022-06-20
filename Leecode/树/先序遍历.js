/**
 * 递归
 */

function preorder(root){
  // 递归边界， root为空
  if(!root){
    return 
  }

  console.log('当前遍历的节点的值是：',root.val)
  preorder(root.left)
  preorder(root.right)
}

/**
 * 非递归
 */
