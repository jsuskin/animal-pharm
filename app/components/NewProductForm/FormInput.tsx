export default function FormInput({
  label,
  value,
  setValue,
}: {
  label: string;
  value: string;
  setValue: (value: string) => void;
}) {
  return (
    <label htmlFor={label.toLowerCase()} className='flex justify-between mx-5'>
      <p className='text-xl'>{label}:</p>
      <input
        name={label.toLowerCase()}
        id={label.toLowerCase()}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className='border border-gray-400 p-2 text-black bg-white'
      />
    </label>
  );
}
