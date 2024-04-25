import React, { useState } from 'react';
import {basicAnswers} from './BasicQuestions';
import {detailedAnswers} from './DetailedQuestions';
import OpenAI from "openai";
//import BasicReport from './BasicReportTemplate';


const ReportResults = () => {
    const [report, setReport] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [ApiKey, setApiKey] = useState<string>('');

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

    let promptFirstHalf = "";
    let promptSecondHalf = "";

  

    const generateBasicPrompt = (questions: string[], answers: string[]) => {
        let QandAprompt = '';
        for (let i = 0; i < questions.length; i++) {
            QandAprompt += [i] + ':' + basicQuestions[i] + ' ' + basicAnswers[i] + '/n'
        }
        return promptFirstHalf + QandAprompt + promptSecondHalf;
    }

    const generateDetailedPrompt = (questions: string[], answers: string[]) => {
        let QandAprompt = '';
        for (let i = 0; i < questions.length; i++) {
            QandAprompt += [i] + ':' + detailedQuestions[i] + ' ' + detailedAnswers[i] + '/n'
        }
        return promptFirstHalf + QandAprompt + promptSecondHalf;
    }



    const submitAnswers = async () => {

        const openai = new OpenAI({
            apiKey: ApiKey,
        })

        if (!ApiKey) {
            setError('Please enter an API key');
            return;
        } else {
            setApiKey(ApiKey);
        }

        const basicPrompt = `Based on the following responses: ${generateBasicPrompt(basicQuestions, basicAnswers)}, what is the most suitable career for you?`;

        const detailedPrompt = `Based on the following responses: ${generateDetailedPrompt(detailedQuestions, detailedAnswers)}, what is the most suitable career for you?`;

        const params = {
            prompt: prompt,
            max_tokens: 1,
            temperature: 0.3,
            api_key: ApiKey,
            model: 'gpt-3.5-turbo,'
        };

        setLoading(true);
        try {
            const response = await openai.completions.create({
                ...params,
                prompt: basicPrompt, // Replace params.prompt with basicPrompt or detailedPrompt
            });
            const completionText = response.choices[0].text.trim();
            setReport(completionText);
            setLoading(false);
        }
        catch (error) {
            setError('Failed to fetch report from OpenAI');
        }
        console.log(basicPrompt);
        console.log(detailedPrompt);
    }

    submitAnswers(); //to avoid errors


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

export default ReportResults;


