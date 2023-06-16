import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocalStorage } from './Auth/LocalStorage';

type Category = {
  id: string;
  name: string;
  is_active: boolean;
};

function Homepage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadHomepage, setLoadHomepage] = useState<boolean>(true);
  const navigate = useNavigate();
  const [token] = useLocalStorage('token');

  async function fetchCategories() {
    try {
      const { data } = await axios.get('https://mock-api.arikmpt.com/api/category', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCategories(data.data);
      setLoadHomepage(false);
    } catch (error) {
      console.error(error);
    }
  }

  const handleDelete = (id: string) => async () => {
    try {
      await axios.delete(`https://mock-api.arikmpt.com/api/category/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error(error);
    }
  }

  const handleAdd = () => {
    navigate('/add')
  }

  const handleEdit = (id: string) => () => {
    navigate(`/edit/${id}`)
  }

  useEffect(() => {
    if (token) {
      fetchCategories();
    }
  }, [token]);


  return (
    <section className='bg-[#213555]'>
      <div className='flex flex-col items-center px-8 py-8 mx-auto min-h-screen'>
        <h2 className='flex text-center mb-10 text-3xl font-semibold text-white'>List of Category</h2>
        <div className='w-full sm:max-w-5xl'>
          <button
            onClick={handleAdd}
            className='text-white bg-blue-800 hover:bg-blue-500 mb-6 focus:outline-none font-medium rounded-lg text-sm px-5 py-3 text-center '>
            Add New Category
          </button>
            <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
            <table className='w-full text-sm text-left text-white rounded-md'>
              <thead className='text-sm text-white bg-gray-700'>
                <tr>
                  <th className='px-6 py-4'>
                    Id
                  </th>
                  <th  className='px-6 py-4'>
                    Name
                  </th>
                  <th className='px-6 py-4'>
                    Status
                  </th>
                  <th className='px-6 py-4'>
                    Actions
                  </th>
                </tr>
              </thead>

                {loadHomepage}
                {categories.map((category) => 
               <thead className='text-sm text-white bg-[#4F709C]'>
                <tr className='border-lg bg-gray-500 border-gray-700 hover:bg-[#213555]'>
                  <th className='px-6 py-4'>
                    {category.id}
                  </th>
                  <th className='px-6 py-4'>
                    {category.name}
                  </th>
                  <th className='px-6 py-4'>
                    {category.is_active ? 'Active' : 'Inactive'}
                  </th>
                  <th className='px-2 py-1'>
                    <button
                    onClick={handleEdit(category.id)}
                    className='mr-4 font-medium text-blue-800 hover:underline'>
                    Edit
                    </button>
                    <button
                    onClick={handleDelete(category.id)}
                    className='font-medium text-red-500 hover:underline'>
                    Delete
                    </button>
                  </th>
                </tr>
              </thead>
              )}
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Homepage;