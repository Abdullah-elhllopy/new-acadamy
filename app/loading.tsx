

// ----------------------------------------------------------------------

import Image from "next/image";

export default function Loading() {
  return <div className="flex items-center justify-center min-h-screen">
    <Image width={100} height={100}  src={'/spinner.gif'}  alt="loading..." />
  </div>
}
