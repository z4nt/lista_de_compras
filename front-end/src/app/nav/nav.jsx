'use client'

export default function NAV () {
    const handleClick = () => {
        window.location.href = '/lista'; 
    };
return(
    <div className=" fixed w-full top-0 bg-white h-10 border-b-2 border-grey-500">
        <button className="mx-10 my-1" onClick={handleClick}>LISTAGEM</button>
        
    </div>
)

}