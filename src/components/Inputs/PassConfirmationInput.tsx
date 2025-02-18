import React from 'react'
import { Form } from 'react-bootstrap';
import {  Control, Controller, FieldErrors, UseFormClearErrors } from 'react-hook-form';

type Confirmation = {
  confirmation: string;
}

type Props = {
  control: Control<any, any>,
  errors: FieldErrors<Confirmation>,
  clearErrors: UseFormClearErrors<Confirmation>,
}

const PassConfirmationInput: React.FC<Props> = ({ control, errors, clearErrors }) => {
  return (
    <>
      <Controller control={control} name="confirmation"
        defaultValue=""
        rules={{
          required: 'You need to confirm your password',
          validate: (_, values) => {
            return values.newPassword
              ? values.newPassword === values.confirmation
              : values.password === values.confirmation },
        }}
        render={({ field: { onChange, value, ref } }) => (
          <Form.Control
            onChange={(value) => {onChange(value); clearErrors(["confirmation"])}}
            value={value}
            ref={ref}
            isInvalid={!!errors.confirmation}
            type="password"
            placeholder="Confirm password"
            autoComplete="current-password"
          />
        )}
      />

      <Form.Control.Feedback type="invalid">
        {errors.confirmation?.message
          || 'Password and confirmation are not equal'}
      </Form.Control.Feedback>
    </>
  )
}

export default PassConfirmationInput
