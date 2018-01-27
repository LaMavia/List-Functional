const _makeFlat = (recursive) => {
  const isFinal = (item) => {
    return Array.isArray(item) ? item.reduce((res, it) => !Array.isArray(it), false) : true 
  };
  
  recursive = Array.isArray(recursive) 
    ? recursive
      .reduce((result, arrItem) => Array.isArray(arrItem) ? result.concat(_makeFlat(arrItem)) : result.concat(arrItem), [])
    : recursive;
    return isFinal(recursive) ? recursive : _makeFlat(recursive);
};

const main = () => {
  const ress = _makeFlat([1,2,[[3,4], 5, 6, [7,[8, [9, 10, 11], 12]]]])

}

main()

function _isArrayLike(el){
  return Array.isArray(el)
}
function MF(recursive) {
  return function flatt(list) {
    var value, jlen, j;
    var result = [];
    var idx = 0;
    var ilen = list.length;

    while (idx < ilen) {
      if (_isArrayLike(list[idx])) {
        value = recursive ? flatt(list[idx]) : list[idx];
        j = 0;
        jlen = value.length;
        while (j < jlen) {
          result[result.length] = value[j];
          j += 1;
        }
      } else {
        result[result.length] = list[idx];
      }
      idx += 1;
    }
    return result;
  };
}

module.exports = {
  _makeFlat,
  MF
}