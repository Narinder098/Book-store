import React, { use } from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import Spinner from '../components/spinner';

import { Link } from 'react-router-dom';
// import {MdOutLineAddBox , MdOutLineDelete} from 'react-icons/md';


const Home = () => {
    const [books, setBooks] = useState();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/books')
            .then((response) => {
                setBooks(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
    }, []);

    return (
        <>
            <div className='p-4'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-3xl my-8'>Books List</h1>
                    <link to='/books/create'>
                    {/* <MdOutLineAddBox className='text-sky-800 text-4xl'/> */}
                    </link>
                </div>
                { loading ? (
                    <Spinner/>
                ) : (
                    <div>
                        <table className='w-full border-separate border-spacing-2'> 
                            <thead>
                                <tr>
                                    <th className="border border-slate-600 rounded-md">Id</th>
                                    <th className="border border-slate-600 rounded-md">Title</th>
                                    <th className="border border-slate-600 rounded-md max-md:hidden">Author</th>
                                    <th className="border border-slate-600 rounded-md max-md:hidden">Publish-Year</th>
                                    <th className="border border-slate-600 rounded-md">Operations</th>
                                </tr>
                            </thead>
                            <tbody>
                                {books.map((book, index) => (
                                    <tr key={book._id} className='h-8'>
                                        <td className='border border-slate-700 rounded-full text-center'>
                                            {index + 1}
                                        </td>
                                        <td className='border border-slate-700 rounded-full text-center'>
                                            {book.title}
                                        </td>
                                        <td className='border border-slate-700 rounded-full text-center'>
                                            {book.author}
                                        </td>
                                        <td className='border border-slate-700 rounded-full text-center'>
                                            {book.publishYear}
                                        </td>
                                        <td className='border border-slate-700 rounded-full text-center'>
                                            
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>                   
                )}


            </div>
        </>
    )
}

export default Home