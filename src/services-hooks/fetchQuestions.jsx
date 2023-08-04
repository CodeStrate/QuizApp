export default async function fetchQuestions(apiParams) {
  const { amount, difficulty, type, category } = apiParams;

  let amountProp = "";
  let diffProp = "";
  let typeProp = "";
  let categoryProp = "";
  if (amount !== "") {
    amountProp = `amount=${amount}`;
  }
  if (category !== "") {
    categoryProp = `&category=${category}`;
  }
  if (difficulty !== "") {
    diffProp = `&difficulty=${difficulty}`;
  }
  if (type !== "") {
    typeProp = `&type=${type}`;
  }

  let apiURL = `https://opentdb.com/api.php?${amountProp}${categoryProp}${diffProp}${typeProp}`;

  const res = await fetch(apiURL);
  const data = await res.json();
  return data.results;
}
