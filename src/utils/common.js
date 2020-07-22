export function removePropertyOfNull(obj) {
  Object.keys(obj).forEach(item=>{
    if(!obj[item])  delete obj[item]
  })
  return obj;
}