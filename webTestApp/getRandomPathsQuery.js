const storage = [
  {"sourceId":281,"targetId":192},
  {"sourceId":193,"targetId":91},
  {"sourceId":260,"targetId":136},
  {"sourceId":217,"targetId":179},
  {"sourceId":216,"targetId":190},
  {"sourceId":74,"targetId":243},
  {"sourceId":279,"targetId":115},
  {"sourceId":67,"targetId":227},
  {"sourceId":103,"targetId":233},
  {"sourceId":225,"targetId":173},
  {"sourceId":171,"targetId":243},
  {"sourceId":235,"targetId":115},
  {"sourceId":197,"targetId":262},
  {"sourceId":115,"targetId":276},
  {"sourceId":166,"targetId":202},
  {"sourceId":213,"targetId":278},
  {"sourceId":253,"targetId":99},
  {"sourceId":143,"targetId":185},
  {"sourceId":280,"targetId":55},
  {"sourceId":213,"targetId":215},
  {"sourceId":4,"targetId":135},
  {"sourceId":258,"targetId":129},
  {"sourceId":203,"targetId":174},
  {"sourceId":263,"targetId":100},
  {"sourceId":263,"targetId":228},
  {"sourceId":114,"targetId":270},
  {"sourceId":281,"targetId":59},
  {"sourceId":55,"targetId":136},
  {"sourceId":102,"targetId":265},
  {"sourceId":229,"targetId":119},
  {"sourceId":260,"targetId":278},
  {"sourceId":65,"targetId":167},
  {"sourceId":91,"targetId":57},
  {"sourceId":159,"targetId":203},
  {"sourceId":127,"targetId":251},
  {"sourceId":212,"targetId":15},
  {"sourceId":14,"targetId":9},
  {"sourceId":251,"targetId":125},
  {"sourceId":257,"targetId":126},
  {"sourceId":194,"targetId":279},
  {"sourceId":55,"targetId":60},
  {"sourceId":164,"targetId":270},
  {"sourceId":132,"targetId":250},
  {"sourceId":242,"targetId":192},
  {"sourceId":257,"targetId":116}
];

/**
 * @returns {{sourceId: number, targetId: number}}
 */
export function getRandomPathsQuery() {
  return storage[Math.floor(Math.random() * storage.length)];
}
