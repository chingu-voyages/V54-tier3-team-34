# Penta AI

> Bringing structure to the chaos of prompt engineering - Check out the live version [here](https://v54-tier3-team-34-production.up.railway.app/)

## Features

- [x] [Basic functionality outlined in chingu's readme](https://github.com/chingu-voyages/voyage-project-aihelper?tab=readme-ov-file#functionality)
- [x] Interact with the LLM in chat format, and receive answers that remember previous dialogue
- [x] Access existing chats if you have the corresponding url

## Prerequisites

- [Node.js >= 16.9](https://nodejs.org/en)
- [A running Mongodb database](https://www.mongodb.com/)
- [A Gemini API key](https://ai.google.dev/gemini-api/docs/api-key)

## Setting up Dev

1. Clone this project:

   ```sh
   git clone https://github.com/chingu-voyages/V54-tier3-team-34.git && \
   cd v54-tier3-team-34
   ```

2. Install the dependencies

   ```sh
   npm ci --prefix client
   npm ci --prefix server
   ```

3. Make a copy of `.env.example` named `.env` in both folders and fill the variables inside appropriately

4. Run the dev server from both folders

   ```sh
   npm run dev --prefix client
   ```

   ```sh
   npm run dev --prefix server
   ```

5. open the client's localhost url that the terminal shows

## Team Documents & Links

- [Trello Board](https://trello.com/b/rVEhCs7Z/pentagram-ai-assistant)
- [Meeting notes](./docs/meeting-notes.md)
- [Team Decision Log](./docs/decision-log.md)

## Our Team

- Rafael Vecchi: [GitHub](https://github.com/VecchiR) / [LinkedIn](https://www.linkedin.com/in/rafaelvecchisilva/)
- Greg Minezzi: [GitHub](https://github.com/minezzig) / [LinkedIn](https://linkedin.com/in/gregoryminezzi)
- Anita Boakye-Yiadom: [GitHub](https://github.com/AnitaBoakye) / [LinkedIn](https://linkedin.com/in/anitaboakyeyiadom)
- Anas Maddah: [GitHub](https://github.com/snowbytes) / [LinkedIn - TBD](https://linkedin.com/)
- Abdulsamad Yusuf: [GitHub](https://github.com/samad13) / [LinkedIn](https://www.linkedin.com/in/abdulsamad-yusuf-ba006)
- Kosisochukwu Azubogu: [GitHub](https://github.com/azubogukosiso) / [LinkedIn](https://linkedin.com/in/azubogu-kosisochukwu)
- Pat Okwu: [GitHub](https://github.com/SnowmanP423)
