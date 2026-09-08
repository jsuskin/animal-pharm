"use client";
import FormInput from "@/app/components/NewProductForm/FormInput";
import { signInWithEmail } from "@/utils/supabase/auth";
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className=''>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const { error } = await signInWithEmail(email, password);

          if (error) {
            console.error(error);
            return;
          }
        }}
      >
        <FormInput
          type='email'
          label='Email'
          value={email}
          setValue={setEmail}
          placeholder='Please enter your email address'
          required
        />
        <div className='relative'>
          <FormInput
            type={showPassword ? "text" : "password"}
            label='Password'
            value={password}
            setValue={setPassword}
            placeholder='Please enter your password'
            icon={
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeSlashIcon aria-hidden='true' />
                ) : (
                  <EyeIcon aria-hidden='true' />
                )}
              </button>
            }
            autoComplete='current-password'
            required
          />
        </div>
        <button type='submit' className='fixed bottom-0 text-2xl bg-blue-300 p-5 w-full'>
          SIGN-IN
        </button>
      </form>
    </div>
  );
}
