import { useStore } from "../store/useStore";

export default function InventoryTable() {
  const inventory = useStore((state) => state.inventory);

  return (
    <div>
      <h2 className='text-3xl'>Inventory</h2>
      <table className='border'>
        <thead>
          <tr>
            {["Name", "Manufacturer", "Minimum Quantity"].map((t) => (
              <th key={t} className='border py-2 px-4' scope='col'>
                {t}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {inventory?.map((item) => (
            <tr key={item.id}>
              <th className='border py-2 px-4' scope='row'>
                {item.name}
              </th>
              <td className='border py-2 px-4'>{item.manufacturer}</td>
              <td className='border py-2 px-4'>{item.minimum_quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
