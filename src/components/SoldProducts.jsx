import React from 'react';

const SoldProducts = () => {
    return (
        <section className='flex flex-col w-full max-w-2xl mt-8 sm:mt-0 '>
            <article className='flex flex-col items-center gap-5 sm:justify-between sm:flex-row'>
                <table class="w-2/5 divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead class="ltr:text-left rtl:text-right">
                    <tr>
                        <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Producto
                        </th>
                        <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Cantidad
                        </th>
                        <th class="px-4 py-2"></th>
                    </tr>
                    </thead>

                    <tbody class="divide-y divide-gray-200">
                    <tr>
                        <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            queso
                        </td>
                        <td class="whitespace-nowrap px-4 py-2 text-gray-700">24</td>

                        <td class="whitespace-nowrap px-4 py-2">
                            <a
                                href="#"
                                class="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                            >
                                View
                            </a>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <table class="w-2/5 divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead class="ltr:text-left rtl:text-right">
                        <tr>
                            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                Producto
                            </th>
                            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                Cantidad
                            </th>
                            <th class="px-4 py-2"></th>
                        </tr>
                    </thead>

                    <tbody class="divide-y divide-gray-200">
                        <tr>
                            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                Queso
                            </td>
                            <td class="whitespace-nowrap px-4 py-2 text-gray-700">5</td>

                        <td class="whitespace-nowrap px-4 py-2">
                            <a
                                href="#"
                                class="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                            >
                                View
                            </a>
                        </td>
                </tr>

            </tbody>
                </table>
            </article>
            <div className='table-responsive overflow-x-auto'>
            <table className="min-w-full  divide-y-2 mt-10 divide-gray-200 bg-white text-sm">
                <thead className="text-left">
                    <tr>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Producto
                        </th>
                        <th className="whitespace-nowrap hidden sm:table-cell col-span-2 px-4 py-2 font-medium text-gray-900">
                            Llevo
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Vendió
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Total
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    <tr>
                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Queso fresco
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700 hidden sm:table-cell">300</td>
                        <td className="whitespace-nowrap  px-4 py-2 text-gray-700">240</td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">1680</td>
                    </tr>
                </tbody>
            </table>
            </div>
        </section>
    );
}

export default SoldProducts;