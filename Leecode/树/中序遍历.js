/**
 * 递归
 */
 function inorder(root){
  if(!root){
    return 
  }
  preorder(root.left)
  console.log('当前遍历的节点的值是：',root.val)
  preorder(root.right)
}


/**
 * 非递归
 */

// 首先遍历找到最深层的左子树

function inorder1(root){
  let res = [], stack = []
  while(root || stack.length){
    while(root){
      stack.push(root)
      root = root.left
    }

    root = stack.pop()
    res.push(root.val)
    root = root.right
  }
}


function inorder2(root){
  let res = [], stack = []
  while(root || stack.length){
    if(root){
      // 遍历左子树
      stack.push(root)
      root = root.left
    }else{
      // 空值，出栈
      let node = stack.pop()
      res.push(node.val)
      root = node.right
    }
  }
}