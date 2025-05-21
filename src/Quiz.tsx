import React, { useState } from "react";

type AnswerOption = {
    text: string;
    isCorrect: boolean;
};

type Question = {
    questionText: string;
    answerOptions: AnswerOption[];
    explanation: string;
};

const PacemakerQuiz: React.FC = () => {
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [showScore, setShowScore] = useState<boolean>(false);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [answerSubmitted, setAnswerSubmitted] = useState<boolean>(false);
    const [quizStarted, setQuizStarted] = useState<boolean>(false);
    const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
    const quizLength = 25;
    const [showExplanation, setShowExplanation] = useState<boolean>(false);

    // Function to shuffle array using Fisher-Yates algorithm
    const shuffleArray = (array: Question[]): Question[] => {
        const shuffled = [...array];
        for (let index = shuffled.length - 1; index > 0; index--) {
            const randomIndex = Math.floor(Math.random() * (index + 1));
            [shuffled[index], shuffled[randomIndex]] = [
                shuffled[randomIndex],
                shuffled[index],
            ];
        }
        return shuffled;
    };


    // Start the quiz
    const startQuiz = () => {
        const shuffled = shuffleArray(questions);
        setShuffledQuestions(shuffled.slice(0, quizLength));
        setQuizStarted(true);
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setSelectedAnswer(null);
        setAnswerSubmitted(false);
    };

    // Regenerate questions (reshuffle without resetting score)
    const regenerateQuestions = () => {
        const shuffled = shuffleArray(questions);
        setShuffledQuestions(shuffled.slice(0, quizLength));
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setAnswerSubmitted(false);
        setShowScore(false);
        setShowExplanation(false);
    };

    // Handle answer selection
    const handleAnswerClick = (isCorrect: boolean, index: number) => {
        if (!answerSubmitted) {
            setSelectedAnswer(index);
            setAnswerSubmitted(true);
            if (isCorrect) {
                setScore(score + 1);
            }
        }
    };

    // Move to next question
    const handleNextQuestion = () => {
        setShowExplanation(false);
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < shuffledQuestions.length) {
            setCurrentQuestion(nextQuestion);
            setSelectedAnswer(null);
            setAnswerSubmitted(false);
        } else {
            setShowScore(true);
        }
    };

    // Restart the quiz
    const restartQuiz = () => {
        startQuiz();
    };

    // Toggle explanation
    const toggleExplanation = () => {
        setShowExplanation((prev) => !prev);
    };

    // All quiz questions
    const questions = [
        // Basic pacemaker knowledge questions
        {
            questionText:
                "What do the first two letters in a pacemaker code (e.g., DDD, VVI) represent?",
            answerOptions: [
                { text: "Chambers paced and chambers sensed", isCorrect: true },
                {
                    text: "Chambers paced and response to sensing",
                    isCorrect: false,
                },
                {
                    text: "Rate modulation and programmability",
                    isCorrect: false,
                },
                {
                    text: "Energy output and sensitivity threshold",
                    isCorrect: false,
                },
            ],
            explanation:
                "The first letter represents the chambers paced (A=atrium, V=ventricle, D=dual), and the second letter represents the chambers sensed.",
        },
        {
            questionText:
                'In the pacemaker code "VVI", what does the third letter "I" represent?',
            answerOptions: [
                { text: "Inhibited response to sensing", isCorrect: true },
                { text: "Increased rate response", isCorrect: false },
                { text: "Internal sensing", isCorrect: false },
                { text: "Intermittent pacing", isCorrect: false },
            ],
            explanation:
                'The third letter in the pacemaker code refers to the response to sensing. "I" indicates that pacing is inhibited when intrinsic activity is sensed.',
        },
        {
            questionText:
                "Which pacing mode would be most appropriate for a patient with SA node dysfunction but intact AV conduction?",
            answerOptions: [
                { text: "AAI", isCorrect: true },
                { text: "VVI", isCorrect: false },
                { text: "VOO", isCorrect: false },
                { text: "DOO", isCorrect: false },
            ],
            explanation:
                "AAI pacing is appropriate for SA node dysfunction with intact AV conduction as it paces and senses the atrium while allowing normal conduction to the ventricles.",
        },
        {
            questionText:
                "A patient with complete heart block would most benefit from which pacing mode?",
            answerOptions: [
                { text: "VVI or DDD", isCorrect: true },
                { text: "AAI", isCorrect: false },
                { text: "AOO", isCorrect: false },
                { text: "OAO", isCorrect: false },
            ],
            explanation:
                "Complete heart block requires ventricular pacing. VVI provides single-chamber ventricular pacing with sensing and inhibition, while DDD provides dual-chamber pacing with more physiologic function if atrial activity is present.",
        },
        {
            questionText:
                "What is the primary advantage of DDD pacing over VVI pacing?",
            answerOptions: [
                { text: "Maintenance of AV synchrony", isCorrect: true },
                { text: "Lower battery consumption", isCorrect: false },
                { text: "Simpler programming requirements", isCorrect: false },
                { text: "Reduced risk of lead dislodgment", isCorrect: false },
            ],
            explanation:
                "DDD pacing maintains AV synchrony by coordinating atrial and ventricular contractions, which improves cardiac output and prevents pacemaker syndrome.",
        },
        {
            questionText:
                "In an asynchronous pacing mode like VOO, what occurs when an intrinsic heartbeat is detected?",
            answerOptions: [
                {
                    text: "The pacemaker continues to pace at the programmed rate regardless",
                    isCorrect: true,
                },
                {
                    text: "The pacemaker inhibits the next paced beat",
                    isCorrect: false,
                },
                {
                    text: "The pacemaker triggers an immediate paced beat",
                    isCorrect: false,
                },
                {
                    text: "The pacemaker temporarily increases sensitivity",
                    isCorrect: false,
                },
            ],
            explanation:
                "In asynchronous pacing modes (VOO, AOO, DOO), the pacemaker delivers pacing stimuli at the programmed rate regardless of intrinsic cardiac activity, as there is no sensing function.",
        },
        {
            questionText:
                "What potential complication may occur with asynchronous pacing?",
            answerOptions: [
                {
                    text: "R-on-T phenomenon leading to ventricular arrhythmias",
                    isCorrect: true,
                },
                {
                    text: "Chronic undersensing of atrial events",
                    isCorrect: false,
                },
                { text: "Permanent oversensing of T waves", isCorrect: false },
                {
                    text: "Progressive increase in capture threshold",
                    isCorrect: false,
                },
            ],
            explanation:
                "Asynchronous pacing can lead to the R-on-T phenomenon if a pacing stimulus falls on the vulnerable period of the T wave, potentially triggering ventricular tachycardia or fibrillation.",
        },
        {
            questionText:
                'What does "sensitivity" refer to in a pacemaker setting?',
            answerOptions: [
                {
                    text: "The minimum voltage required to detect intrinsic cardiac activity",
                    isCorrect: true,
                },
                {
                    text: "The output energy delivered during pacing",
                    isCorrect: false,
                },
                {
                    text: "The refractory period after a paced event",
                    isCorrect: false,
                },
                {
                    text: "The rate at which the pacemaker delivers impulses",
                    isCorrect: false,
                },
            ],
            explanation:
                "Sensitivity refers to the threshold voltage required for the pacemaker to detect intrinsic cardiac activity. Lower mV values represent higher sensitivity (more sensitive).",
        },
        {
            questionText:
                "When adjusting sensitivity on a pacemaker (measured in mV), which would represent the MOST sensitive setting?",
            answerOptions: [
                { text: "0.5 mV", isCorrect: true },
                { text: "2.0 mV", isCorrect: false },
                { text: "5.0 mV", isCorrect: false },
                { text: "10.0 mV", isCorrect: false },
            ],
            explanation:
                "Lower mV values indicate higher sensitivity. A setting of 0.5 mV means the pacemaker will detect signals as low as 0.5 mV, making it more sensitive than higher mV settings.",
        },
        {
            questionText:
                'What does the term "output" refer to in pacemaker settings?',
            answerOptions: [
                {
                    text: "The energy delivered to stimulate cardiac tissue (measured in mA or V)",
                    isCorrect: true,
                },
                {
                    text: "The heart rate response to exercise",
                    isCorrect: false,
                },
                {
                    text: "The sensitivity to intrinsic cardiac signals",
                    isCorrect: false,
                },
                {
                    text: "The information displayed on the pacemaker programmer",
                    isCorrect: false,
                },
            ],
            explanation:
                "Output refers to the energy (amplitude) delivered by the pacemaker to stimulate the heart, typically measured in milliamperes (mA) or volts (V).",
        },
        {
            questionText: 'What is "capture" in relation to cardiac pacing?',
            answerOptions: [
                {
                    text: "Successful depolarization of cardiac tissue following a pacing stimulus",
                    isCorrect: true,
                },
                {
                    text: "Detection of intrinsic cardiac activity",
                    isCorrect: false,
                },
                {
                    text: "The process of programming a pacemaker",
                    isCorrect: false,
                },
                {
                    text: "Placement of leads in the cardiac chambers",
                    isCorrect: false,
                },
            ],
            explanation:
                "Capture occurs when a pacemaker stimulus successfully initiates cardiac depolarization, resulting in contraction of the heart chamber being paced.",
        },
        {
            questionText:
                'What is the "stimulation threshold" in cardiac pacing?',
            answerOptions: [
                {
                    text: "The minimum energy required to consistently capture the heart",
                    isCorrect: true,
                },
                {
                    text: "The maximum rate at which the pacemaker can deliver impulses",
                    isCorrect: false,
                },
                {
                    text: "The voltage at which the pacemaker detects intrinsic activity",
                    isCorrect: false,
                },
                {
                    text: "The time delay between atrial and ventricular pacing",
                    isCorrect: false,
                },
            ],
            explanation:
                "The stimulation threshold is the minimum energy (output) needed to consistently achieve cardiac capture. Output is typically set at 2-3 times the threshold for safety margin.",
        },
        {
            questionText:
                "When determining pacemaker output settings, what safety margin is typically recommended?",
            answerOptions: [
                {
                    text: "2-3 times the stimulation threshold",
                    isCorrect: true,
                },
                {
                    text: "0.5-1 times the stimulation threshold",
                    isCorrect: false,
                },
                {
                    text: "5-6 times the stimulation threshold",
                    isCorrect: false,
                },
                {
                    text: "0.5 mA above the stimulation threshold",
                    isCorrect: false,
                },
            ],
            explanation:
                "A safety margin of 2-3 times the stimulation threshold is typically recommended to ensure consistent capture, accommodating for threshold fluctuations while avoiding excessive energy use.",
        },
        {
            questionText:
                'What is meant by "A-V interval" in dual-chamber pacing?',
            answerOptions: [
                {
                    text: "The time between atrial and ventricular pacing or sensing",
                    isCorrect: true,
                },
                {
                    text: "The threshold for detecting atrial and ventricular signals",
                    isCorrect: false,
                },
                {
                    text: "The energy delivered to the atrium versus the ventricle",
                    isCorrect: false,
                },
                {
                    text: "The rate at which atrial and ventricular sensing occurs",
                    isCorrect: false,
                },
            ],
            explanation:
                "The A-V interval is the programmed time delay between atrial and ventricular events (either paced or sensed), mimicking the natural PR interval of the heart.",
        },
        {
            questionText:
                "What is the purpose of the PVARP (Post-Ventricular Atrial Refractory Period) setting?",
            answerOptions: [
                {
                    text: "To prevent the pacemaker from sensing retrograde atrial events and causing pacemaker-mediated tachycardia",
                    isCorrect: true,
                },
                {
                    text: "To maximize battery life by reducing unnecessary pacing",
                    isCorrect: false,
                },
                {
                    text: "To increase the sensitivity for ventricular sensing",
                    isCorrect: false,
                },
                {
                    text: "To maintain a minimum heart rate during sleep",
                    isCorrect: false,
                },
            ],
            explanation:
                "PVARP is the period after a ventricular event during which the atrial channel cannot sense. This prevents sensing of retrograde atrial depolarizations that could trigger pacemaker-mediated tachycardia.",
        },
        {
            questionText:
                'What does "Upper Rate" refer to in dual-chamber pacing?',
            answerOptions: [
                {
                    text: "The maximum ventricular pacing rate during atrial tracking",
                    isCorrect: true,
                },
                {
                    text: "The highest programmable base rate",
                    isCorrect: false,
                },
                {
                    text: "The maximum output amplitude available",
                    isCorrect: false,
                },
                {
                    text: "The highest sensitivity setting possible",
                    isCorrect: false,
                },
            ],
            explanation:
                "Upper Rate limits how fast the ventricles can be paced in response to sensed atrial activity, preventing excessive ventricular rates during atrial tachyarrhythmias or rapid atrial pacing.",
        },
        {
            questionText: "What is Rapid Atrial Pacing (RAP) used for?",
            answerOptions: [
                {
                    text: "Terminating atrial tachyarrhythmias or inducing arrhythmias for diagnostic purposes",
                    isCorrect: true,
                },
                {
                    text: "Maintaining a higher heart rate during exercise",
                    isCorrect: false,
                },
                {
                    text: "Regular pacing in patients with complete heart block",
                    isCorrect: false,
                },
                {
                    text: "Conserving battery life during periods of high activity",
                    isCorrect: false,
                },
            ],
            explanation:
                "Rapid Atrial Pacing (RAP) is used therapeutically to interrupt certain types of atrial tachyarrhythmias or diagnostically to induce arrhythmias for evaluation.",
        },
        {
            questionText:
                "What is a fusion beat in the context of cardiac pacing?",
            answerOptions: [
                {
                    text: "A beat resulting from simultaneous intrinsic and paced depolarization",
                    isCorrect: true,
                },
                {
                    text: "A paced beat originating from both atrium and ventricle simultaneously",
                    isCorrect: false,
                },
                {
                    text: "A beat caused by competing atrial pacemakers",
                    isCorrect: false,
                },
                {
                    text: "The merging of two pacing pulses due to timing error",
                    isCorrect: false,
                },
            ],
            explanation:
                "A fusion beat occurs when a pacemaker stimulus and intrinsic depolarization happen nearly simultaneously, resulting in a QRS morphology that is a blend of both paced and intrinsic conduction patterns.",
        },
        {
            questionText:
                "What should you do first if a patient with a pacemaker experiences syncope?",
            answerOptions: [
                {
                    text: "Obtain a 12-lead ECG and rhythm strip",
                    isCorrect: true,
                },
                {
                    text: "Immediately place magnets over the pacemaker",
                    isCorrect: false,
                },
                {
                    text: "Increase the pacing rate to maximum",
                    isCorrect: false,
                },
                {
                    text: "Switch to an asynchronous pacing mode",
                    isCorrect: false,
                },
            ],
            explanation:
                "The first step should be to obtain a 12-lead ECG and rhythm strip to evaluate pacemaker function and determine if the syncope is related to pacemaker malfunction or other causes.",
        },
        {
            questionText:
                "How often should temporary pacemaker batteries be changed according to best practice?",
            answerOptions: [
                {
                    text: "At least once every week during continuous use",
                    isCorrect: true,
                },
                {
                    text: "Only when the low battery indicator appears",
                    isCorrect: false,
                },
                { text: "Every 24 hours", isCorrect: false },
                {
                    text: "Monthly or when the first battery fails",
                    isCorrect: false,
                },
            ],
            explanation:
                "Best practice is to replace temporary pacemaker batteries at least once every week during continuous use, for each new patient, and whenever the low battery indicator appears.",
        },
        {
            questionText:
                "What type of battery is used in the Medtronic 5392 temporary pacemaker?",
            answerOptions: [
                {
                    text: "Two LR6-sized (AA) alkaline batteries",
                    isCorrect: true,
                },
                { text: "Lithium-ion rechargeable battery", isCorrect: false },
                { text: "Single 9V alkaline battery", isCorrect: false },
                { text: "Two CR123A lithium batteries", isCorrect: false },
            ],
            explanation:
                "The Medtronic 5392 temporary pacemaker uses two standard LR6-sized (AA) alkaline batteries.",
        },
        {
            questionText:
                "When replacing batteries in a temporary pacemaker during an emergency situation, what should be done first?",
            answerOptions: [
                {
                    text: "Ensure the pacemaker is locked before replacing the batteries",
                    isCorrect: true,
                },
                {
                    text: "Disconnect the patient from the pacemaker",
                    isCorrect: false,
                },
                { text: "Switch to an asynchronous mode", isCorrect: false },
                {
                    text: "Increase the pacing rate to maximum",
                    isCorrect: false,
                },
            ],
            explanation:
                "In an emergency battery replacement situation, ensure the pacemaker is locked before replacing batteries. This maintains pacing at current settings for at least 30 seconds with nominal values.",
        },
        {
            questionText:
                "What does the LOCK/UNLOCK key on a temporary pacemaker do?",
            answerOptions: [
                {
                    text: "Prevents inadvertent adjustment of pacing parameters",
                    isCorrect: true,
                },
                { text: "Secures the battery compartment", isCorrect: false },
                {
                    text: "Toggles between standard and emergency pacing modes",
                    isCorrect: false,
                },
                {
                    text: "Controls access to advanced programming features",
                    isCorrect: false,
                },
            ],
            explanation:
                "The LOCK/UNLOCK key prevents inadvertent adjustment of parameters by locking the controls. When locked, rate and output values cannot be adjusted, though pacing continues at the currently selected values.",
        },
        {
            questionText:
                "Which pacemaker function does NOT lock when the LOCK/UNLOCK key is activated?",
            answerOptions: [
                { text: "DOO/EMERGENCY key", isCorrect: true },
                { text: "Rate adjustment", isCorrect: false },
                { text: "Output adjustment", isCorrect: false },
                { text: "PAUSE key", isCorrect: false },
            ],
            explanation:
                "The DOO/EMERGENCY key does not lock when the pacemaker is locked. If pressed while the temporary pacemaker is locked, it will still begin asynchronous pacing.",
        },
        {
            questionText:
                "What is the purpose of the PAUSE key on a temporary pacemaker?",
            answerOptions: [
                {
                    text: "To suspend pacing and sensing temporarily to view intrinsic rhythm",
                    isCorrect: true,
                },
                {
                    text: "To permanently stop all pacemaker functions",
                    isCorrect: false,
                },
                {
                    text: "To pause only the ventricular output",
                    isCorrect: false,
                },
                {
                    text: "To temporarily reduce the pacing rate by 50%",
                    isCorrect: false,
                },
            ],
            explanation:
                "The PAUSE key suspends pacing and sensing for up to 10 seconds, allowing clinicians to observe the patient's intrinsic cardiac rhythm without pacemaker interference.",
        },
        {
            questionText:
                "What happens when you press the DOO/EMERGENCY key on a temporary pacemaker?",
            answerOptions: [
                {
                    text: "Initiates high-output, dual-chamber asynchronous pacing",
                    isCorrect: true,
                },
                {
                    text: "Displays emergency contact information",
                    isCorrect: false,
                },
                {
                    text: "Automatically adjusts to optimal settings based on patient condition",
                    isCorrect: false,
                },
                {
                    text: "Activates a 30-second alarm to alert medical staff",
                    isCorrect: false,
                },
            ],
            explanation:
                "The DOO/EMERGENCY key initiates high-output, dual-chamber asynchronous pacing (DOO mode) for emergency situations when reliable pacing is immediately needed.",
        },
        {
            questionText:
                "How do you view a patient's intrinsic rhythm when using a temporary pacemaker?",
            answerOptions: [
                {
                    text: "Reduce the rate gradually until intrinsic rhythm takes over or press the PAUSE key",
                    isCorrect: true,
                },
                {
                    text: "Increase sensitivity to maximum on both channels",
                    isCorrect: false,
                },
                { text: "Turn the pacemaker off briefly", isCorrect: false },
                { text: "Switch to OOO mode in the menu", isCorrect: false },
            ],
            explanation:
                "To view intrinsic rhythm, either gradually reduce the pacing rate below the patient's intrinsic rate until the intrinsic rhythm emerges, or press and hold the PAUSE key to temporarily suspend pacing and sensing.",
        },
    ];

    // Render the quiz component
    return (
        <div className="quiz-main-container">
            {(quizStarted && !showScore) && (
                <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
                    <button onClick={restartQuiz} className="quiz-action-btn">Restart Quiz</button>
                    <button onClick={startQuiz} className="quiz-action-btn">Regenerate Questions</button>
                </div>
            )}
            {!quizStarted ? (
                <div className="quiz-header">
                    <h1 className="quiz-title">Interactive Pacemaker Education Quiz</h1>
                    <p className="quiz-description">
                        This quiz contains {questions.length} questions about temporary pacemakers. Each time you take the quiz, you'll receive {quizLength} randomly selected questions.
                    </p>
                    <button onClick={startQuiz} className="quiz-action-btn" style={{marginTop: 24}}>
                        Start Quiz
                    </button>
                </div>
            ) : showScore ? (
                <div className="quiz-complete-block">
                    <h1 className="quiz-complete-title">Quiz Complete!</h1>
                    <div className="quiz-complete-score">
                        You scored {score} out of {shuffledQuestions.length}
                        <span style={{ display: "block", marginTop: 8 }}>
                            ({Math.round((score / shuffledQuestions.length) * 100)}%)
                        </span>
                    </div>
                    <button onClick={restartQuiz} className="quiz-action-btn">
                        Restart Quiz
                    </button>
                </div>
            ) : (
                <>
                    <div className="quiz-score-bar">
                        <span>Question {currentQuestion + 1} of {shuffledQuestions.length}</span>
                        <span>Score: {score}</span>
                    </div>
                    <div className="quiz-question-block">
                        <div className="quiz-question-text">
                            {shuffledQuestions[currentQuestion].questionText}
                        </div>
                        <div className="quiz-options-list">
                            {shuffledQuestions[currentQuestion].answerOptions.map((option, index) => {
                                let optionClass = "quiz-option";
                                if (answerSubmitted && selectedAnswer === index) {
                                    optionClass += option.isCorrect ? " selected-correct" : " selected-wrong";
                                } else if (answerSubmitted && option.isCorrect) {
                                    optionClass += " selected-correct";
                                }
                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswerClick(option.isCorrect, index)}
                                        className={optionClass}
                                        disabled={answerSubmitted}
                                    >
                                        {option.text}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    {answerSubmitted && (
                        <>
                            <button onClick={toggleExplanation} className="quiz-action-btn" style={{marginBottom: 10}}>
                                {showExplanation ? "Hide Explanation" : "Show Explanation"}
                            </button>
                            {showExplanation && (
                                <div className="quiz-explanation-block">
                                    <strong>Explanation:</strong>
                                    <div>{shuffledQuestions[currentQuestion].explanation}</div>
                                </div>
                            )}
                            <button
                                onClick={handleNextQuestion}
                                className="quiz-action-btn"
                                style={{marginTop: 10}}
                            >
                                {currentQuestion < shuffledQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                            </button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default PacemakerQuiz;
