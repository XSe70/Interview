//并发
//tasks数组，数组包含很多方法，每一个方法执行就是放松一个请求，基于promise管理

const delay = function delay(interval) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(interval)
    }, interval)
  })
}
let tasks = [
  () => {
    return delay(1000)
  },
  () => {
    return delay(1000)
  },
  () => {
    return delay(4000)
  },
  () => {
    return delay(1000)
  },
  () => {
    return delay(1000)
  },
  () => {
    return delay(1000)
  },
]
async function asyncPool1(limit, array){
    let res = []
    let executing = [] //正在执行的promise
    for(const item of array){
        const p = Promise.resolve(item()) //防止返回的函数不是promise
        res.push(p)
        if(limit <= array.length){
            // then回调执行时，从executing中删除
            const e = p.then(() => executing.splice(executing.indexOf(e), 1))
            executing.push(e)

            if(executing.length >= limit){
                //等待一个promise状态发生变化
                //状态更改后，就会掉then的回调，从数组中删除
                await Promise.race(executing)
            }

        }

    }
    return Promise.all(res)
}


// asyncPool1(2, tasks)
//   .then((results) => {
//     //都成功，整体才成功，按顺序存储结果
//     console.log('成功--》', results)
//   })
//   .catch((reason) => {
//     //只要有一个失败，整体就是失败
//     console.log('失败--》', reason)
//   })

  /**
   * 按顺序执行
   */

  function asyncPool2(limit, array){
    limit = limit || 5

    let res = []
    let count = 0
    
    let p = new Array(limit).fill(null)

    p = p.map(()=>{
        return new Promise((resolve,reject)=>{
            var run = function(){
                if(count >= array.length){
                    resolve()
                    return 
                }
                const flag = count
                array[count++]().then((value)=>{
                    res[flag] = value
                    run()
                }).catch(e=>{
                    reject(e)
                })
            }
            run()
            
        })
    })
    return Promise.all(p).then((m)=>res)
  }
//   asyncPool2(2, tasks)
//   .then((results) => {
//     //都成功，整体才成功，按顺序存储结果
//     console.log('成功--》', results)
//   })
//   .catch((reason) => {
//     //只要有一个失败，整体就是失败
//     console.log('失败--》', reason)
//   })

/**
 * 不按顺序执行
 * 成功--》 [ 1000, 1000, 1000, 1000, 1000, 4000 ]
 */
function asyncPool3(limit,array,callback){
    class taskQueue{
        constructor(){
            this.executing = 0
            this.queue = []
            this.res = []
        }
        push(fn){
            this.queue.push(fn)
            this.next()
        }
        next(){
            while(this.executing < limit && this.queue.length){
                const target = this.queue.shift()
                this.executing ++ 
                target().then(data=>{
                    this.res.push(data)
                    this.executing--
                    this.next()
                })
            }
            if(this.executing === 0){
                callback(this.res)
            }
        }
    }
    const taskqueue = new taskQueue()
    for(let item of array){
        taskqueue.push(item)
    }
}

asyncPool3(2, tasks, function(results){
    console.log('成功--》', results)
})