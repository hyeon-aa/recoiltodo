import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { Kinds, kindState, todoState } from "../atom";

interface IForm {
    toDo: string;
}

const CreateTodo = () => {

    const [todos, setTodos] = useRecoilState(todoState)
    const { register, handleSubmit, setValue } = useForm();

    const [kind, setKind] = useRecoilState(kindState);

    const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
        setKind(event.currentTarget.value)
    }

    const todoSubmit = (data: IForm) => {
        console.log('data', data)
        setTodos([...todos, { text: data.toDo, id: Date.now(), category: "todo", kind: kind }])
        //입력하고 초기화 
        setValue("toDo", "")
    }

    console.log('todos', todos)
    return (
        <>
            <div >
                <select value={kind} onInput={onInput}>
                    <option value={Kinds.study}>study</option>
                    <option value={Kinds.exercise}>exercise</option>
                    <option value={Kinds.routine}>routine</option>
                </select>
                <form onSubmit={handleSubmit(todoSubmit)}>
                    <input {...register("toDo")}></input>
                    <button>add</button>
                </form>
            </div>
        </>
    );
};

export default CreateTodo;