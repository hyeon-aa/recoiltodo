import { useForm, SubmitHandler } from "react-hook-form"
import { errorSelector } from "../node_modules/recoil/index";

interface IForm {
    name: string;
    email: string;
    password1: string;
    password2: string;
}

const TodoList = () => {

    const { register, handleSubmit, formState: { errors }, setError } = useForm<IForm>(
        {
            defaultValues: {
                email: "@naver.com"
            }
        }
    );

    const onValid = (data: IForm) => {
        if (data.password1 !== data.password2) {
            setError("password1",
                { message: "password are not the same" })
        }
        console.log('data', data)
    }

    return (
        <>
            <div >
                <form onSubmit={handleSubmit(onValid)}>
                    <input {...register("name",
                        {
                            required: "name is required"
                            , validate: (value) =>
                                value.includes("nico") ? "no nico allowed" : true,
                        })} placeholder='name'></input>
                    <span>{errors?.name?.message}</span>
                    <input {...register("email",
                        {
                            required: "email is required"
                            , pattern: {
                                value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                                message: "Only naver.com emails allowed",
                            }
                        })} placeholder='email'></input>
                    <span>{errors?.email?.message}</span>
                    <input {...register("password1",
                        {
                            required: "password1 is required",
                            minLength: {
                                value: 5,
                                message: "your password1 is too short"
                            }
                        })} placeholder='password1'></input>
                    <span>{errors?.password1?.message}</span>
                    <input {...register("password2", { required: "password2 is required" })} placeholder='password2'></input>
                    <button>ADD</button>
                </form>
            </div>
        </>
    );
};

export default TodoList;