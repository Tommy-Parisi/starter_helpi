import React, { useEffect, useState } from 'react';
import axios from 'axios';


const ReportResults = () => {
    const [report, setReport] = useState<String>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<String>('');
    const [ApiKey, setApiKey] = useState<String>('');
    const [answers, setAnswers] = useState<String[]>([]);

    let basicQuestions: string[] = ['"I prefer working with numbers and data.", "I prefer working with words and languages."',
                        '"I prefer working with other people.", "I prefer working by myself."',
                        '"I prefer to be in charge.", "I prefer to be told what to do."',
                        '"I prefer my work to be predictable and consistent", "I prefer my work to have variety and opportunity for creativity."',
                        '"I prefer active and hands on tasks.", "I prefer working on a computer."',
                        '"I prefer working to improve quality of life (e.g., healthcare, education).","I prefer working in entertainment and leisure (e.g., gaming, sports)"',
                        '"I prefer science and technology.", "I prefer design and communication."',
                        '"I prefer science and technology.", "I prefer design and communication."'
    ];

    let detailedQuestions: string[] = ["1. What hobbies/activities do you engage in during your free time?",
                        "2. What are your top three skills or strengths?",
                        "3. What is your ideal working environment?",
                        "4. What are your long-term career goals?",
                        "5. What type of tasks do you find most fulfilling? Include the topic and type.",
                        "6. What are your favorite subjects or topics to learn about?",
                        "7. What are the three most predominant qualities of your personality?"
    ];

    const generatePrompt = (questions: string[], answers: string[]) => {
        let QandAprompt = '';
        for (let i = 0; i < questions.length; i++) {
            QandAprompt += questions[i] + ' ' + answers[i] + ' ';
        }
        return QandAprompt;
    }


    const submitAnswers = async () => {
        if (!ApiKey) {
            setError('Please enter an API key');
            return;
        }
        if (!answers) {
            setError('Please answer all questions');
            return;
        }

        const basicPrompt = `Based on the following responses: ${generatePrompt(basicQuestions, basicAnswers)}, what is the most suitable career for you?`;

        const detailedPrompt = `Based on the following responses: ${generatePrompt(detailedQuestions, detailedAnswers)}, what is the most suitable career for you?`;

        const params = {
            prompt: prompt,
            max_tokens: 1,
            temperature: 0.3,
            api_key: ApiKey
        };
        setLoading(true);
        try {
            const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', params);
            setReport(response.data.choices[0].text.trim());
            setLoading(false);
        }
        catch (error) {
            setError('Failed to fetch report from OpenAI');
        }
    }

    return (
        <>
            <div className='pageTop'>
                <h2 className='styledText'>Your Career Companion</h2>
            </div>

            <div className="pageBody">
                <div className='container'>
                    <div className="column">
                        <h1>Report Results</h1>
                        <p>{loading ? 'Loading...' : report}</p>
                        <p>{error}</p>
                    </div>
                </div>
            </div>
        </>
    )

}


