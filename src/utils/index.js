import { nanoid } from "nanoid";
import { decode } from "he";

export const createOption = (value) => ({
  id: nanoid(),
  value: decode(value),
});

// Could be called transformer or mapper doesn't matter
export const quizDataUnmarshaller = (data) => {
  const answer = createOption(data.correct_answer);

  const options = data.incorrect_answers.map(createOption);
  options.push(answer);
  options.sort(() => Math.random() - 0.5);

  return {
    questionId: nanoid(),
    question: decode(data.question),
    answer,
    options,
    selectedOptionId: "",
  };
};
