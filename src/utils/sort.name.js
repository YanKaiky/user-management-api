const sortName = (array) => {
  array.sort((sr, fr) => {
    if (sr.name.toLowerCase() < fr.name.toLowerCase()) return -1;

    if (sr.name.toLowerCase() > fr.name.toLowerCase()) return 1;

    return 0;
  })

  return array;
}

module.exports = sortName;
