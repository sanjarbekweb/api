# Quiz Questions API

A small Express API that serves quiz questions and answer keys from JSON files and scores submitted answers. It uses Node.js ES modules, Express 5, CORS, and body-parser.

## Run locally

Use a current Node.js LTS release and pnpm 10.12.1 (the version declared in `package.json`). From the repository root:

```sh
pnpm install
pnpm dev
```

The server listens on port **3000**. `pnpm start` runs it without file watching. Run commands from the root because the data paths are relative to the working directory.

## Endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/health` | Returns `{ "message": "ok" }`. |
| GET | `/questions` | Returns `data/questions.json`. |
| GET | `/rights` | Returns the answer key from `data/rights.json`. |
| POST | `/check` | Scores a JSON array of `[questionId, selectedOption]` pairs. |

`POST /check` returns `countOfRightAnswers` and `correctAnswers`. Option values are compared with strict equality, so their types must match the stored answer key.

## Project files

- `index.js` — middleware, routes, scoring, and server startup.
- `data/questions.json` — quiz question bank.
- `data/rights.json` — correct option values indexed by question ID.

## Current limitations

The POST, PUT, and DELETE question-management handlers call `questions()` even though `questions` is an array; those routes need correction before use. The API exposes the answer key and has no authentication or request validation, so it is a learning/demo service. Data is loaded at startup; restart after editing the JSON files. No automated test script is defined.

## License

See [LICENSE](LICENSE).
