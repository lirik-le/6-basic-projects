import React, {useState} from "react";
import './index.scss';

const questions = [
    {
        title: 'React - это ... ?',
        variants: ['библиотека', 'фреймворк', 'приложение'],
        correct: 0,
    },
    {
        title: 'Компонент - это ... ',
        variants: ['приложение', 'часть приложения или страницы', 'то, что я не знаю что такое'],
        correct: 1,
    },
    {
        title: 'Что такое JSX?',
        variants: [
            'Это простой HTML',
            'Это функция',
            'Это тот же HTML, но с возможностью выполнять JS-код',
        ],
        correct: 2,
    },
];

type ResultProps = {
  correct: number;
  setCorrect: React.Dispatch<React.SetStateAction<number>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const Result: React.FC<ResultProps> = ({correct, setCorrect, setStep}) => {
    const newGame = () => {
        setStep(0);
        setCorrect(0);
    }

    return (
        <div className="result">
            <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" alt=""/>
            <h2>Вы отгадали {correct} ответа из 10</h2>
            <button onClick={newGame}>Попробовать снова</button>
        </div>
    );
}

type GameProps = {
    step: number;
    question: {
      title: string;
      variants: string[];
    };
    onClickVariant: (index: number) => void;
};

const Game: React.FC<GameProps> = ({step, question, onClickVariant}) => {
    const percent = (step / questions.length) * 100;

    return (
        <>
            <div className="progress">
                <div style={{width: `${percent}%`}} className="progress__inner"></div>
            </div>
            <h1>{question.title}</h1>
            <ul>
                <li>{question.variants.map(
                    (text, index) => (<li onClick={() => onClickVariant(index)} key={index}>{text}</li>)
                )}</li>
            </ul>
        </>
    );
}

const App: React.FC = () => {
    const [step, setStep] = useState<number>(0);
    const [correct, setCorrect] = useState<number>(0);
    const question = questions[step];

    const onClickVariant = ((index: number) => {
        setStep(step + 1);

        if (index === question.correct) {
            setCorrect(correct + 1);
        }
    });

    return (
        <div className="App">
            {
                step !== questions.length ? <Game question={question} onClickVariant={onClickVariant} step={step}/> :
                    <Result correct={correct} setCorrect={setCorrect} setStep={setStep}/>
            }
        </div>
    );
}

export default App;