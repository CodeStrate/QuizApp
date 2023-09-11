export default async function fetchQuestions(apiParams, signal) {
  const { amount, difficulty, type, category } = apiParams;

  const searchParams = new URLSearchParams({
    amount,
    category,
    difficulty,
    type,
  });

  const res = await fetch(`https://opentdb.com/api.php?${searchParams}`, {
    signal,
  });
  const data = await res.json();

  return data.results;
}
