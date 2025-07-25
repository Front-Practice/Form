import React, { useState } from 'react';

interface FormData {
  fullName: string;
  email: string;
  password: string;
  birthday: string;
  gender: string;
}

interface TableRowData extends FormData {
  id: number;
}

const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5 text-gray-500 flex-shrink-0"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5 text-gray-500 flex-shrink-0"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243L6.228 6.228"
    />
  </svg>
);

const Form: React.FC = () => {
  const initialFormState: FormData = {
    fullName: '',
    email: '',
    password: '',
    birthday: '',
    gender: '',
  };

  const initialTableData: TableRowData[] = [];

  const [view, setView] = useState<'form' | 'table'>('table');
  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [tableData, setTableData] = useState<TableRowData[]>(initialTableData);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showPasswordInForm, setShowPasswordInForm] = useState<boolean>(false);
  const [visiblePasswordIdInTable, setVisiblePasswordIdInTable] = useState<number | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.fullName || !formData.email || !formData.password || !formData.birthday || !formData.gender) {
      alert('Please fill out all fields before submitting.');
      return;
    }
    if (editingId !== null) {
      setTableData(tableData.map((row) => (row.id === editingId ? { ...formData, id: editingId } : row)));
      setEditingId(null);
    } else {
      setTableData([...tableData, { ...formData, id: Date.now() }]);
    }
    setFormData(initialFormState);
    setShowPasswordInForm(false);
  };

  const handleDelete = (id: number) => {
    setTableData(tableData.filter((row) => row.id !== id));
  };

  const handleUpdate = (id: number) => {
    const rowToUpdate = tableData.find((row) => row.id === id);
    if (rowToUpdate) {
      setFormData(rowToUpdate);
      setEditingId(id);
      setView('form');
    }
  };

  const PasswordVisibleInTable = (id: number) => {
    setVisiblePasswordIdInTable(visiblePasswordIdInTable === id ? null : id);
  };

  const Required = () => <span className="text-red-500 mr-1">*</span>;

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-4">
      {view === 'form' ? (
        <div className="w-full flex flex-col items-center">
          <div className="w-[350px] h-auto bg-[#fff] rounded-lg shadow-lg">
            <div className="flex items-center justify-center mt-[20px] font-bold text-3xl">
              <h1>{editingId !== null ? 'Update User' : 'Signup Form'}</h1>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 w-full p-6">
              <div>
                <h4 className="flex items-center">
                  <Required />
                  Full Name
                </h4>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  className="border p-2 rounded-[3px] border-gray-600 w-full"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <h4 className="flex items-center">
                  <Required />
                  Email Address
                </h4>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  className="border rounded-[3px] p-2 w-full"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <h4 className="flex items-center">
                  <Required />
                  Password
                </h4>
                <div className="relative">
                  <input
                    type={showPasswordInForm ? 'text' : 'password'}
                    name="password"
                    placeholder="Enter your password"
                    className="border rounded-[3px] p-2 w-full"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordInForm(!showPasswordInForm)}
                    className="absolute inset-y-0 right-0 px-3 flex items-center"
                  >
                    {showPasswordInForm ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>
              <div>
                <h4 className="flex items-center">
                  <Required />
                  Date of Birth
                </h4>
                <input
                  type="date"
                  name="birthday"
                  className="border rounded-[3px] p-2 w-full"
                  value={formData.birthday}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <h4 className="flex items-center">
                  <Required />
                  Gender
                </h4>
                <select
                  name="gender"
                  id="gender"
                  className="border rounded-[3px] p-2 w-full"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select your gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <button
                type="submit"
                className="border-2 rounded-[4px] w-full h-[40px] pb-1 bg-[#2D7873] text-white hover:bg-[#25635f] transition-colors"
              >
                {editingId !== null ? 'Save Changes' : 'Submit'}
              </button>
            </form>
          </div>
          <button
            onClick={() => setView('table')}
            className="mt-6 bg-gray-800 text-white py-2 px-6 rounded-lg hover:bg-gray-900 transition-colors"
          >
            View Data Table
          </button>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center">
          <button
            onClick={() => setView('form')}
            className="mb-6 bg-gray-800 text-white py-2 px-6 rounded-lg hover:bg-gray-900 transition-colors"
          >
            Back to Form
          </button>
          <table className="w-full max-w-5xl bg-white rounded-t-lg border-b-[5px] border-[#01987A] text-left shadow-lg table-fixed">
            <thead className="bg-[#01987A] text-white">
              <tr>
                <th className="p-3 w-12 text-center">#</th>
                <th className="p-3">Full Name</th>
                <th className="p-3 text-center">Email</th>
                <th className="p-3">Password</th>
                <th className="p-3">Birthday</th>
                <th className="p-3">Gender</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {tableData.map((row, index) => (
                <tr key={row.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="p-3 align-middle text-center">{index + 1}</td>
                  <td className="p-3 align-middle truncate" title={row.fullName}>
                    {row.fullName}
                  </td>
                  <td className="p-3 align-middle truncate" title={row.email}>
                    {row.email}
                  </td>
                  <td className="p-3 align-middle">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate" title={row.password}>
                        {visiblePasswordIdInTable === row.id ? row.password : '********'}
                      </span>
                      <button onClick={() => PasswordVisibleInTable(row.id)} className="flex-shrink-0">
                        {visiblePasswordIdInTable === row.id ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                    </div>
                  </td>
                  <td className="p-3 align-middle">{row.birthday}</td>
                  <td className="p-3 align-middle">{row.gender}</td>
                  <td className="p-3 align-middle">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleUpdate(row.id)}
                        className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition-colors"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(row.id)}
                        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Form;
