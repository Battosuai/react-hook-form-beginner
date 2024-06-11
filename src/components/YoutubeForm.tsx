import { useForm, useFieldArray, FieldErrors } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

type FormType = {
    username: string;
    email: string;
    channel: string;
    social: {
        twitter: string;
        facebook: string;
    };
    phoneNumbers: string[];
    phNumbers: {
        number: string;
    }[];
    age: number;
    dob: Date;
};
function YoutubeForm() {
    const form = useForm<FormType>({
        defaultValues: {
            username: 'Batman',
            email: 'robin@email.com',
            channel: 'Youtube',
            social: {
                twitter: '',
                facebook: '',
            },
            phoneNumbers: [],
            phNumbers: [{ number: '' }],
            age: 0,
            dob: new Date(),
        },
        // For async default values
        // defaultValues: async () => {
        //   const response = await fetch(
        //     "https://jsonplaceholder.typicode.com/users/1"
        //   );
        //   const payload = await response.json();
        //   return {
        //     username: payload.username,
        //     email: payload.email,
        //     channel: "",
        //   };
        // },
        mode: 'onChange', // onBlur , onSubmit , onTouched, onChange, all
    });
    const {
        register,
        control,
        handleSubmit,
        formState,
        getValues,
        setValue,
        watch,
        reset,
        trigger,
    } = form;
    //   console.log("formState", formState);
    const {
        errors,
        dirtyFields,
        touchedFields,
        isDirty,
        isValid,
        isSubmitting,
        isSubmitted,
        isSubmitSuccessful,
        submitCount,
    } = formState;

    console.log({ dirtyFields, touchedFields, isDirty });

    console.log({ isSubmitting, isSubmitted, isSubmitSuccessful, submitCount });

    const onSubmit = (data: FormType) => {
        console.log('submitted', data);
    };

    const onError = (errors: FieldErrors<FormType>) => {
        console.log('Form Error', errors);
    };

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'phNumbers',
    });

    const handleGetValues = () => {
        const username = getValues('username');
        // Also allowed
        // getValues(["username", "age"]);
        console.log(username);
    };

    const handleSetValues = () => {
        setValue('username', '', {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
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
                <p>{errors.username?.message}</p>

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
                            validate: {
                                notAdmin: (fieldValue) => {
                                    return (
                                        fieldValue !== 'admin@example.com' ||
                                        'Enter a different mail'
                                    );
                                },
                                notBlacklisted: (fieldValue) => {
                                    return (
                                        !fieldValue.endsWith('asd.com') ||
                                        'This domain is blacklisted'
                                    );
                                },
                                // Async validation possible
                            },
                        })}
                    />
                </div>
                <p>{errors.email?.message}</p>

                <div>
                    <label htmlFor='channel'>Channel</label>
                    <input
                        type='text'
                        id='channel'
                        {...register('channel', {
                            disabled: watch('channel') === 'You',
                            required: {
                                value: true,
                                message: 'Channel is required',
                            },
                        })}
                    />
                </div>
                <p>{errors.channel?.message}</p>

                <div>
                    <label htmlFor='twitter'>Twitter</label>
                    <input
                        type='text'
                        id='twitter'
                        {...register('social.twitter', {
                            required: {
                                value: true,
                                message: 'Twitter is required',
                            },
                        })}
                    />
                </div>
                <p>{errors.social?.twitter?.message}</p>

                <div>
                    <label htmlFor='facebook'>Facebook</label>
                    <input
                        type='text'
                        id='facebook'
                        {...register('social.facebook', {
                            required: {
                                value: true,
                                message: 'Facebook is required',
                            },
                        })}
                    />
                </div>
                <p>{errors.social?.facebook?.message}</p>

                <div>
                    <label htmlFor='age'>Age</label>
                    <input
                        type='number'
                        id='age'
                        {...register('age', {
                            valueAsNumber: true,
                            required: {
                                value: true,
                                message: 'Age is required',
                            },
                        })}
                    />
                </div>
                <p>{errors.age?.message}</p>

                <div>
                    <label htmlFor='dob'>Date of Birth</label>
                    <input
                        type='date'
                        id='dob'
                        {...register('dob', {
                            valueAsDate: true,
                            required: {
                                value: true,
                                message: 'Date of birth is required',
                            },
                        })}
                    />
                </div>
                <p>{errors.dob?.message}</p>

                <div>
                    <label htmlFor='phoneNumbers.0'>Primary Phone Number</label>
                    <input
                        type='text'
                        id='primary-phone'
                        {...register('phoneNumbers.0')}
                    />
                </div>

                <div>
                    <label htmlFor='phoneNumbers.1'>
                        Secondary Phone Number
                    </label>
                    <input
                        type='text'
                        id='phoneNumbers.1'
                        {...register('phoneNumbers.1')}
                    />
                </div>
                <div>
                    <h1>Dynamic List</h1>
                    {fields.map((field, index) => (
                        <div key={field.id}>
                            <label htmlFor={`phNumbers.${index}.number`}>
                                Secondary Phone Number
                            </label>

                            <input {...register(`phNumbers.${index}.number`)} />
                            <button onClick={() => remove(index)}>
                                Remove
                            </button>
                        </div>
                    ))}
                    <button onClick={() => append({ number: '' })}>
                        Add more
                    </button>
                </div>
                <button disabled={!isDirty || !isValid || isSubmitting}>
                    Submit
                </button>
            </form>
            <button onClick={handleGetValues}>Get Value</button>
            <button onClick={handleSetValues}>Set Value</button>
            <button onClick={() => reset()}>Reset</button>
            <button onClick={() => trigger('dob')}>
                Trigger manual validation
            </button>
            <DevTool control={control} />
        </div>
    );
}

export default YoutubeForm;
