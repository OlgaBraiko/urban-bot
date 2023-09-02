import { useState } from 'react';
import { Route, Router, Text, ButtonGroup, Button, useText, Image, Dialog, DialogStep } from '@urban-bot/core';
import fs from 'fs';
import logo from './assets/logo.png';

const file = fs.readFileSync(logo);

function Echo() {
    const [text, setText] = useState('Привет!');

    useText(({ text }) => {
        setText(text);
    });

    return (
        <Text>
            <i>{text}</i>
        </Text>
    );
}

function Logo() {
    const [title, setTitle] = useState('Urban Bot');

    const addRobot = () => {
        setTitle(title + '🤖');
    };

    return (
        <Image
            title={title}
            file={file}
            buttons={
                <ButtonGroup>
                    <Button onClick={addRobot}>Add robot</Button>
                </ButtonGroup>
            }
        />
    );
}

function FlatDialogExample() {
    return (
        <Dialog onFinish={(answers) => console.log(answers)}>
            <DialogStep content={<Text>Привет, как тебя зовут?</Text>} id="name" onNext={(name) => console.log(name)}>
                <DialogStep content={<Text>Cколько тебе лет?</Text>} id="age" onNext={(age) => console.log(age)}>
                    <DialogStep content={<Text>Из какого ты города?</Text>} id="city" />
                </DialogStep>
            </DialogStep>
        </Dialog>
    );
}

export const TreeDialog = () => {
    return (
        <Dialog>
            <DialogStep
                content={
                    <ButtonGroup title={'Привет, что хочешь заказать?'}>
                        <Button id="hat">Футболка</Button>
                        <Button id="glasses">Очки</Button>
                        <Button id="bag">Сумка</Button>
                    </ButtonGroup>
                }
            >
                <DialogStep
                    match="hat"
                    content={
                        <ButtonGroup title="Какой размер твоей футболки?">
                            <Button id="s">S</Button>
                            <Button id="m">M</Button>
                            <Button id="l">L</Button>
                        </ButtonGroup>
                    }
                />
                <DialogStep
                    match="glasses"
                    content={
                        <ButtonGroup title="Какого цвета очки?">
                            <Button id="Черный">Черный</Button>
                            <Button id="Желтый">Желтый</Button>
                            <Button id="Розовый">Розовый</Button>
                        </ButtonGroup>
                    }
                />
                <DialogStep
                    match="bag"
                    content={
                        <ButtonGroup title="Какой цвет сумки?">
                            <Button id="Черный">Черная</Button>
                            <Button id="Желтый">Желтая</Button>
                            <Button id="Розовый">Розовая</Button>
                        </ButtonGroup>
                    }
                />
            </DialogStep>
        </Dialog>
    );
};

export const Counter = () => {
    const [counter, setCounter] = useState(0);

    const increment = () => setCounter(counter + 1);
    const decrement = () => setCounter(counter - 1);

    return (
        <ButtonGroup title={counter} isNewMessageEveryRender={false}>
            <Button onClick={increment}>+1</Button>
            <Button onClick={decrement}>-1</Button>
        </ButtonGroup>
    );
};

export function App() {
    return (
        <>
            {/* <Text>Привет, друг!</Text> */}
            {/* <Echo /> */}
            {/* <Counter /> */}
            {/* <FlatDialogExample /> */}
            <TreeDialog />

            <Router>
                <Route path="/echo">
                    <Echo />
                </Route>
                <Route path="/logo">
                    <Logo />
                </Route>
            </Router>
        </>
    );
}
