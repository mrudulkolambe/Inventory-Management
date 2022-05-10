import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { Link, useLocation } from 'react-router-dom'
import { useUserAuth } from '../context/UserAuthContext'
import { useUserContext } from '../context/UseMembersContext'



export default function Navbar({ nav }) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  const { logOut, user } = useUserAuth()
  const { admin, isVerified } = useUserContext()
  const [firstName, SetfirstName] = useState("");
  const location = useLocation()

  const InitialState = [
    { name: 'Home', to: '/', current: false },
    { name: 'Search', to: '/search', current: false },
    { name: 'Add Equipment', to: '/add/equipment', current: false },
    { name: 'Update Equipment Record', to: '/update/equipment', current: false },
    { name: 'Scrap', to: '/scrap', current: false },
  ]
  const [navigation, setNavigation] = useState(InitialState);
  useEffect(() => {
    if (user) {
      if (isVerified) {
        setNavigation([
          { name: 'Home', to: '/', current: false },
          { name: 'Search', to: '/search', current: false },
          { name: 'Add Equipment', to: '/add/equipment', current: false },
          { name: 'Shift', to: '/shift', current: false },
          { name: 'Update Equipment Record', to: '/update/equipment', current: false },
        ])
      }
    }
    if (user && admin) {
      if (admin.includes(user.uid)) {
        setNavigation([
          { name: 'Home', to: '/', current: false },
          { name: 'Search', to: '/search', current: false },
          { name: 'Add Equipment', to: '/add/equipment', current: false },
          { name: 'Update Equipment Record', to: '/update/equipment', current: false },
          { name: 'Scrap', to: '/scrap', current: false },
          { name: 'Shift', to: '/shift', current: true },
          { name: 'Admin Panel', to: '/admin', current: true },
          { name: 'Import XLXS', to: '/xlxs', current: true },
        ])
      } else {
        setNavigation([
          { name: 'Home', to: '/', current: false },
          { name: 'Search', to: '/search', current: false },
          { name: 'Add Equipment', to: '/add/equipment', current: false },
          { name: 'Shift', to: '/shift', current: false },
          { name: 'Update Equipment Record', to: '/update/equipment', current: false },
          { name: 'Import XLXS', to: '/xlxs', current: true },
        ])
      }
    }

    if (!isVerified) {
      setNavigation([])
    }
    user && SetfirstName(user.displayName.split(" ")[0])
  }, [admin, user, nav, isVerified]);
  return (
    <Disclosure as="nav" className="bg-gray-700  w-full top-0">
      {({ open }) => (
        <>
          <div className="w-full mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <Link to={"/"} className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start cursor-pointer">
                <div className="flex-shrink-0 flex items-center mr-7">
                  <img
                    className="hidden lg:block h-10 w-auto"
                    src="/sigce.png"
                  />
                  <p className='ml-3 text-white font-medium text-xl'>SIGCE INVENTORY</p>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className={user ? "flex space-x-4" : "hidden"}>
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.to}
                        className='text-gray-300 hover:bg-gray-600 duration-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </Link>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                {/* Profile dropdown */}
                {user ?
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="bg-gray-400 bg-opacity-20 text-sm rounded-lg flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className="sr-only">Open user menu</span>
                        <div className='items-center text-white py-1 px-2 flex'>
                          <img
                            className="h-8 w-8 rounded-full"
                            src="https://toppng.com/uploads/preview/user-account-management-logo-user-icon-11562867145a56rus2zwu.png"
                            alt=""
                          />
                          <p className='ml-2 font-bold'>{firstName}</p>
                        </div>
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
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                        <Menu.Item className="hidden">
                          {({ active }) => (
                            <Link
                              to={"/profile"}
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}

                            >
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item className="hidden">
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              onClick={() => { logOut() }}
                              className={classNames(active ? 'bg-gray-100' : '', 'cursor-pointer block px-4 py-2 text-sm text-gray-700')}
                            >
                              Sign Out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                  :
                  <Link
                    key={"Login"}
                    to={"/login"}
                    className='bg-gray-900 text-gray-300 hover:bg-gray-600 duration-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                  >
                    {"Login"}
                  </Link>
                }
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}