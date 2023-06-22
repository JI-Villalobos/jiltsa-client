type Props = {
  bgBlank?: boolean
}
export default function Spinner({ bgBlank }: Props): JSX.Element {
  return (
    <div className="flex space-x-2 animate-pulse">
      {
        bgBlank ?
          <>
            <div className="w-3 h-3 bg-mp-green rounded-full"></div>
            <div className="w-3 h-3 bg-mp-green rounded-full"></div>
            <div className="w-3 h-3 bg-mp-green rounded-full"></div>
          </>
          : <>
            <div className="w-3 h-3 bg-mp-gray-soft rounded-full"></div>
            <div className="w-3 h-3 bg-mp-gray-soft rounded-full"></div>
            <div className="w-3 h-3 bg-mp-gray-soft rounded-full"></div>
          </>
      }

    </div >
  )
}