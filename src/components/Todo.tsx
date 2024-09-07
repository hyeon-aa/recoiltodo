import * as React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import { todoState } from "../atom";

const Todo = ({ text, category, id }) => {
    const setTodos = useSetRecoilState(todoState)
    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const newCategory = event.currentTarget.name;

        //1.id로 todo찾기(index 찾기)
        setTodos((oldTodos) => {
            const TargetIndex = oldTodos.findIndex((toDo) => toDo.id === id)
            //2. 새로운 todo: 나머지 값은 그대로, category만 새로운 카테고리로 변경 
            const newTodo = { ...oldTodos[TargetIndex], category: newCategory }

            //3.targetindex에 있는 todo를 newTodo로 바꿔준다.
            const newTodos = [...oldTodos]
            newTodos[TargetIndex] = newTodo
            return newTodos;
        })
    }
    return (
        <li>
            <span>{text}</span>
            {category !== "doing" && <button name="doing" onClick={onClick}>doing</button>}
            {category !== "todo" && <button name="todo" onClick={onClick}>todo</button>}
            {category !== "done" && <button name="done" onClick={onClick}>done</button>}
        </li>
    );
};

export default Todo;