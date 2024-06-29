import React, { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import { verifyUser, sendWelcomeEmail } from '../../services/userApi';
import { Toaster, toast } from 'sonner';

export default function Verification ({email} : {email: string})  {
  const [values, setValues] = useState<string[]>(['', '', '', '']);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!isNaN(Number(value)) && value.length <= 1) {
      const newValues = [...values];
      newValues[index] = value;
      setValues(newValues);

      // Mover el foco al siguiente input si hay un valor
      if (value && index < inputsRef.current.length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    try {
        verifyUser(email, values.join('')).then(() => {toast.success('Email validado, puede iniciar sesión')
          setTimeout(() => {window.location.href = '/'} , 5000);
          // sendWelcomeEmail(email);
        })
    } catch (error) {
        toast.error('Codigo de validación invalido')
    }
    
  };

  return (
    <form className="verification_form">
        <Toaster
                toastOptions={{
                    style: {
                        fontSize: '1.5rem',
                        padding: '1rem 1rem',
                    },
                }}
                richColors
                closeButton
                expand={true}
            />
    <span className='verification_title'>Ingresa el código de verificación que te enviamos por email</span>
      <div>
      {values.map((value, index) => (
        <input
          key={index}
          className="verification_input"
          type="text"
          value={value}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          ref={(el) => (inputsRef.current[index] = el)}
          maxLength={1}
        />
      ))}
      </div>
      <button type="submit" className="login_btn" onClick={handleSubmit}>Enviar</button>
    </form>
  );
};

