import { atom, selector } from "recoil"

export enum Kinds {
    "study",
    "exercise",
    "routine"
}
interface iTodo {
    text: string;
    category: "todo" | "doing" | "done";
    id: number;
    kind: Kinds
}

//위의 todostate에 모든 todo들이 저장되어있음 .
export const todoState = atom<iTodo[]>({
    key: 'todoState',
    default: []
})

export const kindState = atom({
    key: 'kind',
    default: Kinds.study
})

export const selectkindState = atom({
    key: 'selectkind',
    default: Kinds.study
})


//selector를 이용해서 category를 분류함 -> state를 가지고 다른 state를 만들 수 있다.-> atom을 가지고 output을 변형 
//selector : state를 가져다가 무언가를 return한다. 
export const toDoSelector = selector({
    key: "todoselector",
    get: ({ get }) => {
        //get은 options라는 인자를 받으면서 호출 - options 객체안에 get function이 있음 -> get: selector의 내부로 atom을 가져올 수 있다.
        const toDos = get(todoState);
        const selectkind = get(selectkindState);
        //여기서 return하는 값이 todoselector의 value
        return ([
            toDos.filter((todo) => todo.category === "todo" && todo.kind === selectkind),
            toDos.filter((todo) => todo.category === "doing" && todo.kind === selectkind),
            toDos.filter((todo) => todo.category === "done" && todo.kind === selectkind),
        ])
    }
})