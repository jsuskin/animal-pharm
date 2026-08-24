export default function FormInput({
  label,
  value,
  setValue,
  type = "text",
  customStyles = "",
  placeholder = "",
}: {
  label: string;
  value: string;
  setValue: (value: string) => void;
  type?: "text" | "date" | "number";
  customStyles?: string;
  placeholder?: string;
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
    <label
      htmlFor={toKebabCase(label)}
      className='flex flex-col my-3 mx-5 gap-1'
    >
      <span className='text-slate-400 w-full'>{label}</span>
      <input
        name={toCamelCase(label)}
        id={toKebabCase(label)}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`border border-gray-400 py-1 px-2 text-slate-400 bg-slate-700 rounded-sm ${customStyles}`}
        inputMode={isNumeric() ? "numeric" : "text"}
        pattern={isNumeric() ? "[0-9]*" : ".*"}
        placeholder={placeholder}
      />
    </label>
  );
}
