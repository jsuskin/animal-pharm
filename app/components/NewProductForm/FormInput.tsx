import React from "react";

export default function FormInput({
  label,
  value,
  setValue,
  type = "text",
  customStyles = "",
  placeholder = "",
  icon,
  autoComplete = "off",
  required = false
}: {
  label: string;
  value: string;
  setValue: (value: string) => void;
  type?: "text" | "date" | "month" | "number" | "email" | "password";
  customStyles?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  autoComplete?: "off" | "on" | "current-password";
  required?: boolean
}) {
  const isNumeric = () => {
    switch (label) {
      case "SKU":
      case "Min. Quantity":
      case "Max. Quantity":
      case "Quantity":
        return true;
      default:
        return false;
    }
  };

  const toKebabCase = (str: string) => str.toLowerCase().replaceAll(".", "").replaceAll(" ", "-");

  const toCamelCase = (str: string) =>
    str
      .toLowerCase()
      .replaceAll(".", "")
      .split(" ")
      .map((item, i) => (i ? item[0].toUpperCase() + item.slice(1) : item))
      .join("");

  return (
    <label htmlFor={toKebabCase(label)} className='flex flex-col my-3 mx-5 gap-1'>
      <span className='text-slate-400 w-full'>{label}</span>
      <div className='relative w-full'>
        <input
          name={toCamelCase(label)}
          id={toKebabCase(label)}
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={`border border-gray-400 w-full py-1 px-2 text-slate-400 bg-slate-700 rounded-sm ${customStyles}`}
          inputMode={isNumeric() ? "numeric" : "text"}
          pattern={isNumeric() ? "[0-9]*" : ".*"}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
        />
        {icon && <div className='absolute flex items-center right-2 top-1/2 -translate-y-1/2 text-3xl'>{icon}</div>}
      </div>
    </label>
  );
}
