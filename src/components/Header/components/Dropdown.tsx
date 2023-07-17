import { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { getCategories } from '../../../services/api';
import Category from '../../Category';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dropdown({ setCategoryId }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => setCategories(await getCategories());
    fetchCategories();
  }, [])

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center  px-3 py-2 text-sm font-semibold text-gray-400  hover:text-gray-600">
          Categorias
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {categories.map(({id, name}) => (
              <Category
                id={id}
                key={id}
                name={name}
                onClick={setCategoryId}
              />
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
