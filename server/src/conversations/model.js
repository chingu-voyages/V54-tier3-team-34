export default function makeConversation({ userInput, aiResult }) {
  /**
   * TODO: add the same client validation after moving ai generation to the server.
   * ? const prompt = makePrompt({ constraint, context, output, persona, task })
   * some considerations:
   * - security risks: guard against XSS - cannot trut users
   * - generate the answer from the backend. Maybe as a prompt property?
   * - security risks: guard against XSS - cannot trust ai answers
   * ? prompt api: maybe { generated, input: { constraint, context, output, persona, task }}
   * - conversation chain would take too many tokens like this. How to make it lean?
   */
  const prompt = {
    generated: aiResult,
    input: {
      constraint: userInput.constraint,
      context: userInput.context,
      output: userInput.output,
      persona: userInput.persona,
      task: userInput.task,
    },
  };

  const content = [prompt];

  // TODO: create unique hash to be used for making the conversation url on the client
  return Object.freeze({
    getContent: () => content,
  });
}
