
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(window.innerWidth < MOBILE_BREAKPOINT)

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return isMobile
}

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = React.useState<"xs" | "sm" | "md" | "lg" | "xl">(
    window.innerWidth < 640 ? "xs" : 
    window.innerWidth < 768 ? "sm" : 
    window.innerWidth < 1024 ? "md" : 
    window.innerWidth < 1280 ? "lg" : "xl"
  )

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) setBreakpoint("xs")
      else if (width < 768) setBreakpoint("sm")
      else if (width < 1024) setBreakpoint("md")
      else if (width < 1280) setBreakpoint("lg")
      else setBreakpoint("xl")
    }
    
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return breakpoint
}
