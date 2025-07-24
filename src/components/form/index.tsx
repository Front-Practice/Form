import React from 'react'

const Form = () => {
  return (
    <div className='flex items-center justify-evenly'>
      <div className='w-[350px] h-[600px] bg-[#fff] mt-[70px] rounded-lg'>
        <div className='flex items-center justify-center mt-[20px] font-bold text-3xl'>
          <h1>Signup Form</h1>
          </div>
            <form action="" className='grid grid-cols-1 gap-5 w-[300px] mt-[15px] p-6'>
              <div>
                <h4>First Name</h4>
                <input type="text" placeholder='Enter your full name'  className='border p-2 rounded-[3px] border-gray-600 w-[300px]'/>
              </div>
              <div>
                 <h4>Email Address</h4>
                 <input type="text" placeholder='Enter your email address' className='border rounded-[3px] p-2 w-[300px]'/>
              </div>
              <div>
                <h4>Password</h4>
                <input type="password" placeholder='Enter your password' className='border rounded-[3px] p-2 w-[300px]'/>
              </div>
              <div>
                <h4>Date of Birth</h4>
                <input type="date" placeholder='text' className='border rounded-[3px] p-2 w-[300px]'/>
              </div>
             <div>
               <h4>Gender</h4>
                <select name="gender" id="gender" className="border rounded-[3px] p-2 w-[300px]">
                  <option value="">Select your gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
             </div>

              <button className='border-2 rounded-[4px] w-[300px] h-[40px] pb-1 bg-[#2D7873] text-white'>Submit</button>
            </form>
      </div>

      <table className='w-[700px] bg-white rounded-t-lg border-b-[5px] border-[#01987A] text-left shadow-lg'>
        <thead className='bg-[#01987A] text-white'>
          <tr>
            <th className='p-3'>Full Name</th>
            <th className='p-3'>Email</th>
            <th className='p-3'>Password</th>
            <th className='p-3'>Birthday</th>
            <th className='p-3'>Gender</th>
          </tr>
        </thead>
        <tbody className='text-gray-800'>
          <tr className='border-b'>
            <td className='p-3'>Domenic</td>
            <td className='p-3'>domenic@example.com</td>
            <td className='p-3'>********</td>
            <td className='p-3'>1990-01-01</td>
            <td className='p-3'>Male</td>
          </tr>
          <tr className='bg-gray-50 border-b'>
            <td className='p-3'>Sally</td>
            <td className='p-3'>sally@example.com</td>
            <td className='p-3'>********</td>
            <td className='p-3'>1992-05-10</td>
            <td className='p-3'>Female</td>
          </tr>
          <tr className='border-b'>
            <td className='p-3'>Nick</td>
            <td className='p-3'>nick@example.com</td>
            <td className='p-3'>********</td>
            <td className='p-3'>1988-12-24</td>
            <td className='p-3'>Male</td>
          </tr>
        </tbody>
      </table>
      
    </div>
  )
}

export default Form