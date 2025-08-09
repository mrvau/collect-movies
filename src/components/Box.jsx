import React from 'react'

const Box = ({children}) => {
  return <div className="bg-[#221F3D] flex p-2 rounded-md justify-center items-center gap-2 w-fit">{children}</div>;
}

export default Box