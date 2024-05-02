/*
import React, { useEffect, Dispatch, useState, SetStateAction } from 'react';
import {basicAnswers} from './BasicQuestions';
import {detailedAnswers} from './DetailedQuestions';
import OpenAI from "openai";
//import BasicReport from './BasicReportTemplate';

const ReportResults = () => {
    const [report, setReport] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [ApiKey, setApiKey] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Assuming the basic template and API Key are used here for demonstration.
                await submitAnswers({
                    template: 'basic', // or 'detailed'
                    ApiKey: ApiKey,
                    setError: setError,
                    setApiKey: setApiKey,
                    setLoading: setLoading,
                    setReport: setReport,
                    generatePrompt: (questions: string[], answers: string[], template: string) => '',
                });
            } catch (e) {
                console.error("Failed to fetch data:", e);
                setError('Failed to fetch data');
            }
        };

        if (ApiKey) {
            fetchData();
        }
    }, [ApiKey]); // This will trigger fetchData whenever ApiKey changes.


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

interface submitAnswersProps {
    template: string;
    ApiKey: string;
    setError: Dispatch<SetStateAction<string>>;
    setApiKey: Dispatch<SetStateAction<string>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
    setReport: Dispatch<SetStateAction<string>>;
    generatePrompt: (questions: string[], answers: string[], template: string) => string;
}

export async function submitAnswers(submitAnswersProps: submitAnswersProps) {
    const { template, ApiKey, setError, setApiKey, setLoading, setReport } = submitAnswersProps;


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

let detailedPromptFirstHalf: string = "Create a career recommender report that is based on the following questions and answers. The report should have 2 different sections. One should have general information about 4 traits that the person seems to exhibit based on their answers. It should also include how these might impact their behavior in the workplace. This section should be concise and use bullet points with short sentences for descriptions. Don’t directly quote the given answers in this part, but find traits that they likely have based off of what they answered. The other section should list 3 different industries and 3 specific job titles within each industry that the quiz taker is likely to succeed in. The report does not need an introduction or conclusion. Here are the questions the user was asked and their corresponding answers. The format of these questions is open ended so the user can type whatever they want.: "
let detailedPromptSecondHalf: string = `"The report should include 3 industries specific to the person that provided the answers. These industries should be one that the person will likely succeed in. Also provide 3 career options within each industry. The report does not need an introduction or conclusion. Make 2 separate sections; One should have general information about 4 traits that the person seems to exhibit and how these might impact their behavior in the workplace. This section should be concise and use bullet points with short sentences for descriptions. Don’t directly quote the given answers in this part, but find traits that they likely have based off of what they answered. The other section should only list the industries and potential careers for each. Here is the javascript code that gives an example of the formatting of the report. Give the results back to me written in javascript. Include one sentence of detail about the traits and explain them in first person like you are talking directly to the person who took the quiz. 
import React from 'react';

interface DetailedReportProps {
   changePage: (page: string) => void;
}


const DetailedReport: React.FC<DetailedReportProps> = ({ changePage }) => {
   return(
       <>
       <div className='pageTop'>
           <h2 className='styledText'>Detailed Career Assessment Report</h2>
       </div>
       <div className="pageBody">
       <div className='container'>
           <div className="column">
               <div className = "generalInfoBasic">
                   <h1>General Information</h1>
                   <p>Based on your answers, you showed the following raits of people with ... careers.</p>
               </div>
           </div>


           <div className="column">
               <div className = "recIndustriesBasic">
                   <h1 className='recBasicHeader'>Suggested Careers</h1>
                   <p className="option1">Option 1: ...</p>
                  <p className="learn">Learn More</p>
               </div>
           </div>
       </div>
       </div>
       </>
       );
}"`

const generatePrompt = (questions: string[], answers: string[], template: string) => {
    let QandAprompt = '';
    for (let i = 0; i < questions.length; i++) {
        QandAprompt += [i] + ':' + basicQuestions[i] + ' ' + basicAnswers[i] + '/n'
    }
    if(template === 'basic') {
        return basicPromptFirstHalf + QandAprompt + basicPromptSecondHalf;
    } else {
        return detailedPromptFirstHalf + QandAprompt + detailedPromptSecondHalf;
    }
}

    const openai = new OpenAI({
        apiKey: ApiKey,
    })

    if (!ApiKey) {
        setError('Please enter an API key');
        return;
    } else {
        setApiKey(ApiKey);
    }

    
    const basicPrompt = `Based on the following responses: ${generatePrompt(basicQuestions, basicAnswers, "basic")}, what is the most suitable career for you?`;
    const detailedPrompt = `Based on the following responses: ${generatePrompt(detailedQuestions, detailedAnswers, "detailed")}, what is the most suitable career for you?`;

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
            prompt: template ? basicPrompt : detailedPrompt,
        });

        const completionText = response.choices[0].text.trim();
        setReport(completionText); //This is the gpt response
        setLoading(false);
    }
    catch (error) {
        setError('Failed to fetch report from OpenAI');
    }
    console.log(basicPrompt);
    console.log(detailedPrompt);
}
*/
export {};