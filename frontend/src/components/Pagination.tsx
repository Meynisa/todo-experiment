/**
 * PaginationComponent - Page Navigation Controls
 *
 * Renders pagination UI with page numbers, prev/next buttons,
 * and a dropdown to select items per page.
 *
 * Features:
 * - Shows up to 5 page numbers at a time with ellipsis for gaps
 * - Items per page selector (5, 10, 20, 50)
 * - "Showing X to Y of Z results" summary
 *
 * Props:
 * - meta: Pagination metadata from API (total, lastPage, etc.)
 * - currentPage: Currently active page number
 * - onPageChange: Callback when page is changed
 * - limit: Current items per page
 * - onLimitChange: Callback when limit is changed
 *
 * Used in: TodoListPage.tsx below the todo grid
 */
import { FiChevronsLeft } from "react-icons/fi"
import type { Pagination } from "../utils/todoModel"

interface PaginationProps {
    meta: Pagination
    currentPage: number
    onPageChange: (page: number) => void
    limit: number
    onLimitChange: (limit: number) => void
}

const PaginationComponent: React.FC<PaginationProps> = ({ meta, currentPage, onPageChange, limit, onLimitChange }) => {
    const pageNumbers: number[] = []
    const maxPagesToShow = 5

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
    const endPage = Math.min(meta.lastPage, startPage + maxPagesToShow - 1)

    if (endPage - startPage < maxPagesToShow - 1) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
    }

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Show</span>
                <select
                    value={limit}
                    onChange={(e) => onLimitChange(Number(e.target.value))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
                <span className="text-sm text-gray-600">per page</span>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Previous Page"
                >
                    <FiChevronsLeft size={20}/>
                </button>

                {startPage > 1 && (
                    <>
                        <button
                            onClick={() => onPageChange(1)}
                            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                        >
                            1
                        </button>
                        {startPage > 2 && <span className="px-2 text-gray-500">...</span>}
                    </>
                )}

                {pageNumbers.map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`px-4 py-2 rounded-lg border transition-colors ${
                            page === currentPage
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'border-gray-300 hover:bg-gray-50'
                            }`}
                    >
                        {page}
                    </button>
                ))}

                {endPage < meta.lastPage && (
                    <>
                        {endPage < meta.lastPage - 1 && <span className="px-2 text-gray-500">...</span>}
                        <button
                            onClick={() => onPageChange(meta.lastPage)}
                            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                        >
                            {meta.lastPage}
                        </button>
                    </>
                )}

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === meta.lastPage}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Next Page"
                >
                    <FiChevronsLeft size={20}/>
                </button>
            </div>

            <div className="text-sm text-gray-600">
                Showing {(currentPage - 1) * limit + 1} to{' '}
                {Math.min(currentPage * limit, meta.total)} of {meta.total} results
            </div>
        </div>
    )
}

export default PaginationComponent
