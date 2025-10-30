export default function AsideLogin(): JSX.Element {
  return (
    <div className="w-1/2 h-screen bg-gradient-to-tl from-mp-blue to-mp-green flex flex-col items-center justify-center"
    >

      <div className="w-full flex flex-row items-center justify-center">
        <div className="h-16 w-16 bg-mp-gray-soft opacity-25 rounded m-2 animate-slow-spin transition-transform duration-1000 ease-in-out transform translate-x-1/2"></div>
        <div className="h-16 w-16 bg-mp-gray-soft opacity-25 rounded animate-slow-spin transition-transform duration-1200 ease-in-out transform -translate-y-1/2"></div>
        <div className="h-16 w-16 bg-mp-gray-soft opacity-25 rounded m-2 transition-transform duration-1000 ease-in-out"></div>
        <div className="h-16 w-16 bg-mp-gray-soft opacity-25 rounded m-2 animate-slow-pulse transition-transform duration-1000 ease-in-out transform translate-x-1/2"></div>
        <div className="h-16 w-16 bg-mp-gray-soft opacity-25 rounded m-2 animate-slow-pulse transition-transform duration-1000 ease-in-out transform translate-x-1/2"></div>

      </div>
    </div>
  )
}