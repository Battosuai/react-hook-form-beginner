import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

type FormType = {
    username: string;
    email: string;
    channel: string;
};
function YoutubeForm() {
    const form = useForm<FormType>();
    const { register, control, handleSubmit } = form;

    const onSubmit = (data: FormType) => {
        console.log('submitted', data);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div>
                    <label htmlFor='username'>Username</label>
                    <input
                        type='text'
                        id='username'
                        {...register('username', {
                            required: {
                                value: true,
                                message: 'Username is required',
                            },
                        })}
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        id='email'
                        {...register('email', {
                            pattern: {
                                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                message: 'Invalid email address',
                            },
                        })}
                    />
                </div>
                <div>
                    <label htmlFor='channel'>Channel</label>
                    <input
                        type='text'
                        id='channel'
                        {...register('channel', {
                            required: {
                                value: true,
                                message: 'Channel is required',
                            },
                        })}
                    />
                </div>
                <button>Submit</button>
            </form>
            <DevTool control={control} />
        </div>
    );
}

export default YoutubeForm;
