import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { useLocalStorage } from './Auth/LocalStorage';

interface FormAdd {
  name: string;
  status: string;
}

const schema = yup
  .object({
    name: yup.string().required(),
    status: yup.string().required(),
  })
  .required();

function AddCategory() {
  const navigate = useNavigate();
  const [token] = useLocalStorage('token');
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data: FormAdd) {
    setLoadingSubmit(true);

    try {
      await axios.post(
        'https://mock-api.arikmpt.com/api/category/create',
        {
          name: data.name,
          is_active: data.status === 'Active' ? true : false,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      navigate('/');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className='bg-[#213555]'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <div className='w-full bg-[#4F709C] overflow-hidden rounded-lg shadow border mt-0 max-w-md p-0'>
          <div className='p-6 space-y-4'>
            <div className='flex items-center justify-between text-white'>
              <h1 className='font-semibold text-2xl'>
                Add New Category
              </h1>
            </div>
            <hr className='h-px my-8 bg-white border-0 scale-x-150' />
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 md:space-y-6' action='#'>
              <div>
                <label
                  className='block mb-2 text-sm font-medium text-white'>
                  Name:
                </label>
                <Controller
                  name='name'
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        type='name'
                        name='name'
                        id='name'
                        value={field.value}
                        onChange={field.onChange}
                        className='bg-[#213555] border-gray-300 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                        placeholder=''
                      />
                      {errors?.name && (
                        <p className='mt-2 text-sm text-red-600text-red-500'>
                          {errors.name.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>

              <div>
                <label
                  className='block mb-2 text-sm font-medium text-white'>
                  Status:
                </label>
                <Controller
                  name='status'
                  control={control}
                  defaultValue='Active'
                  render={({ field }) => (
                    <>
                      <select
                        id='status'
                        onChange={field.onChange}
                        value={field.value}
                        className='bg-[#213555] border-gray-300 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'>
                        <option value='Active'>Active</option>
                        <option value='Inactive'>Inactive</option>
                      </select>
                      {errors?.status && (
                        <p className='mt-2 text-smtext-red-500'>
                          {errors.status.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>

              <button
                type='submit'
                disabled={loadingSubmit}
                className='w-full text-white bg-blue-500 rounded-lg text-sm px-5 py-2.5 text-center'
                onSubmit={handleSubmit(onSubmit)}>Submit
             </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddCategory;