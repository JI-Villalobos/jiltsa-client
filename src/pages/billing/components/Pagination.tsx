import { Dispatch, SetStateAction } from "react"

type Props = {
  currentPage: number
  pages: number
  setNumberPage: Dispatch<SetStateAction<number>>
}

export default function Pagination({ pages, setNumberPage, currentPage }: Props): JSX.Element {

  const handlePage = (action: 'prev' | 'next'): number => {  
    switch (action) {
      case "next":
        if (currentPage < pages) {
          return currentPage++
        } else {
          return currentPage
        }
        break;
      case "prev":
        if (currentPage > 0) {
          return currentPage--
        } else {
          return currentPage
        }
      default:
        return currentPage
        break;
    }
  }

  return (
    <ol className="w-full flex justify-center items-center gap-1 text-xs font-medium">
      <li>
        <button
          onClick={() => {setNumberPage(handlePage("prev"))}}
          className="inline-flex size-8 items-center justify-center rounded border border-mp-soft-dark bg-white text-mp-soft-dark rtl:rotate-180"
        >
          <span className="sr-only">Prev Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </li>

      <li className="flex flex-row">
        {
          Array.from({ length: pages }, (_, index) => (
            <button
              className={
                index == currentPage ? 'block w-6 rounded border border-mp-dark bg-mp-dark text-center leading-6 text-mp-gray-soft m-1'
                  : 'block w-6 rounded border border-mp-soft-dark bg-white text-center leading-6 text-mp-soft-dark hover:bg-mp-dark m-1'
              }
              id={`id-${index}`}
              key={`page-id-${index}`}
              onClick={() => {
                setNumberPage(index)
              }}
            >
              {index + 1}
            </button>
          ))
        }

      </li>
      <li>
        <button
          onClick={() => setNumberPage(handlePage("next"))}
          className="inline-flex size-8 items-center justify-center rounded border border-mp-soft-dark bg-white text-mp-soft-dark rtl:rotate-180"
        >
          <span className="sr-only">Next Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </li>
    </ol>
  )
}