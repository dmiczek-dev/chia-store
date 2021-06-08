import React, {useState} from 'react';
import styles from '../../styles/Register.module.scss';
import {useForm} from 'react-hook-form';
import cx from 'classnames';

export default function Register() {
  const {register, handleSubmit, formState: {errors}} = useForm({mode: 'onBlur'});
  const [isFocused, setIsFocused] = useState(false);

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  const onFocus = () => {
    console.log('sss');

    setIsFocused(true);
  };

  const onBlur = () => {
    console.log('aaaa');
    setIsFocused(false);
  };

  const email = register('email', {required: true});

  return (
      <div className={styles.register}>

        <div className={styles.register__wrapper}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {/* register your input into the hook by invoking the "register" function */}
            <div className={styles.form__group}>
              <label className={cx(
                  styles.form__group, {
                    [styles.inputFocus]: isFocused,
                  },
              )} htmlFor="email">Email</label>
              <input onFocus={onFocus} className={styles.form__input} onChange={(e) => {email.onChange(e);}}
                     onBlur={() => {
                       email.onBlur;
                       onBlur();
                     }}
                     ref={email.ref}/>
              {errors.email && <p>This is required</p>}
            </div>
            <div className={styles.form__group}>
              <label htmlFor="">Email</label>
              <input {...register('pass', {required: true})} />
            </div>

            {/* include validation with required or other standard HTML validation rules */}
            <input {...register('exampleRequired', {required: true})} />
            {/* errors will return when field validation fails  */}
            {errors.exampleRequired && <span>This field is required</span>}

            <input type="submit"/>
          </form>
        </div>
      </div>
  );
}

