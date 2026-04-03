import { Agent } from "../dexter-jp/src/agent";

export async function runDexter(query: string): Promise<string> {

  // const agent = await Agent.create();
  const model = process.env.DEFAULT_MODEL || "gemini-1.5-flash";
  const agent = await Agent.create({ model });

  for await (const event of agent.run(query)) {
    if (event.type === "done") {
      return event.answer ?? "";
    }
  }

  throw new Error("No result");
}
