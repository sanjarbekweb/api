import express from 'express';
import cors from "cors"
import bodyParser from 'body-parser';

const server = express();

server.use(cors())
server.use(bodyParser.json())

const rightOptions = {
    "1": 2,
    "2": 0,
    "3": 0,
    "4": 1
}

const questions = [
    {
        id: 1,
        question: "Ali da nechpul bor?",
        options: [
            {
                answer: "0",
            },
            {
                answer: "-1",
            },
            {
                answer: "100_000_000"
            }
        ]
    },
    {
        id: 2,
        question: "Bruhning profilidagi rasm nima?",
        options: [
            {
                answer: "Capybara",
            },
            {
                answer: "pony",
            },
            {
                answer: "chubakabra",
            },
            {
                answer: "krisa"
            }
        ]
    },
    {
        id: 3,
        question: "Matluba qattedi o'zi?",
        options: [
            {
                answer: "Dacha",
            },
            {
                answer: "Uy",
            },
            {
                answer: "Maktab",
            },
            {
                answer: "Uchebniy senter"
            }
        ]
    },
    {
        id: 4,
        question: "Bugaltr ishdan bo'shidimi yo' m ?",
        options: [
            {
                answer: "Haydimiz",
            },
            {
                answer: "Uloqtiramiz",
            },
            {
                answer: "Tepporamiz",
            }
        ]
    }
]
server.get('/health', (req, res) => {
    res.send(
        { message: "ok" }
    );
});
server.get("/questions", (_, res) => {
    res.send(questions)
})
server.post("/check", (req, res) => {
    let countOfRightAnswers = 0
    const correctAnswers = [] // [questionID, correctOptionIndex]

    for (const a of req.body) {
        const optionIndex = rightOptions[a[0]]

        if (optionIndex === a[1]) {
            countOfRightAnswers++
        }

        correctAnswers.push([a[0], optionIndex]) // har bir savolning to'g'ri javobini qo'shamiz
    }

    res.send({
        countOfRightAnswers,
        correctAnswers
    })
})

server.listen(3000)


function getQuestion(questions, id) {
    for (const q of questions) {
        if (q.id === id) {
            return q
        }
    }
    return null
}