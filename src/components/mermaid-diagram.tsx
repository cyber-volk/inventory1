"use client"

import { useEffect, useRef } from "react"
import mermaid from "mermaid"

interface MermaidDiagramProps {
  chart: string
}

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.log("Rendering Mermaid diagram..."); // Debug log

    if (containerRef.current) {
      mermaid.initialize({
        startOnLoad: true,
        theme: "default",
        securityLevel: "loose",
        fontFamily: "inter",
      })
      
      // Clear previous content
      containerRef.current.innerHTML = ""
      
      // Create a unique ID for this diagram
      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`
      containerRef.current.id = id
      
      try {
        mermaid.render(id, chart).then(({ svg }) => {
          console.log("Diagram rendered successfully:", svg); // Debug log
          if (containerRef.current) {
            containerRef.current.innerHTML = svg
          }
        })
      } catch (error) {
        console.error("Failed to render mermaid diagram:", error)
      }
    }
  }, [chart])

  return <div ref={containerRef} className="overflow-x-auto" />
}
