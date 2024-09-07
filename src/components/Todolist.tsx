import * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { kindState, toDoSelector, todoState, selectkindState, Kinds } from "../atom";
import CreateTodo from "./CreateTodo";
import Todo from "./Todo";

const Todolist = () => {

    const todos = useRecoilValue(todoState)
    const [todoarray, doingarray, donearray] = useRecoilValue(toDoSelector)

    const [selectkind, setselectKind] = useRecoilState(selectkindState);

    const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
        setselectKind(event.currentTarget.value)
    }

    return (
        <>
            <div>
                <span>조회</span>
                <select value={selectkind} onInput={onInput}>
                    <option value={Kinds.study}>study</option>
                    <option value={Kinds.exercise}>exercise</option>
                    <option value={Kinds.routine}>routine</option>
                </select>
            </div>
            <CreateTodo></CreateTodo>
            <h2>todo</h2>
            <ul>
                {todoarray.length >= 1 ? todoarray?.map((todo) => {
                    return (
                        <Todo
                            key={todo.id}
                            text={todo.text}
                            id={todo.id}
                            category={todo.category}
                        ></Todo>
                    )
                }) : ''}
            </ul >
            <h2>doing</h2>
            <ul>
                {doingarray.length >= 1 ? doingarray?.map((todo) => {
                    return (
                        <Todo
                            key={todo.id}
                            {...todo}
                        ></Todo>
                    )
                }) : ''}
            </ul >
            <h2>done</h2>
            <ul>
                {donearray.length >= 1 ? donearray?.map((todo) => {
                    return (
                        <Todo
                            key={todo.id}
                            {...todo}
                        ></Todo>
                    )
                }) : ''}
            </ul >
        </>
    );
};

export default Todolist;