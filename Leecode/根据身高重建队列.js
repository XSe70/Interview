/**
 * @param {number[][]} people
 * @return {number[][]}
 */
 var reconstructQueue = function(people) {

    if(!people.length|| people.length === 1){
        return people
    }
    people.sort((a,b)=>{
        if(a[0] > b[0]){
            return -1
        }else if(a[0] === b[0]){
            if(a[1] > b[1]){
                return 1
            }
            return -1
        }else {
            return 1
        }
    })
    const res = []
    for(let i=0;i<people.length;i++){
        const h = people[i][0], k = people[i][1]
        let index = 0
        if(!res.length){
            res.push(people[i])
        }else {
            while(index<res.length && h<=res[index][0] && index<k){
                index++
            }
            res.splice(index, 0 ,people[i])
        }
    }
    return res
};
console.log(reconstructQueue([[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]))
