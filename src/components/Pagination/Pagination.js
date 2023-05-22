import React from 'react'
import ReactPaginate from "react-paginate"

const Pagination = ({ info, pageNumber, setPageNumber }) => {
    return <ReactPaginate className='p-paginator list-none font-medium'
        forcePage={pageNumber === 1 ? 0 : pageNumber - 1}
        nextLabel=">"
        previousLabel="<"
        previousClassName='p-paginator-prev'
        nextClassName='p-paginator-next'
        pageClassName='p-paginator p-paginator-pages p-paginator-page'
        pageLinkClassName='p-link p-paginator-page'
        activeClassName='surface-300 text-purple-700 border-round-3xl'
        onPageChange={(page) => {
            setPageNumber(page.selected + 1);

        }}
        pageCount={info?.pages} />
}

export default Pagination