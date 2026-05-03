"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { characters, type Character } from "@/lib/data/characters"

interface NodePosition {
  id: string
  x: number
  y: number
}

export function NetworkVisualization() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 })
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [positions, setPositions] = useState<NodePosition[]>([])

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setDimensions({ width: rect.width, height: Math.max(600, rect.width * 0.6) })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  useEffect(() => {
    // Calculate node positions in a circular/organic layout
    const centerX = dimensions.width / 2
    const centerY = dimensions.height / 2
    const radius = Math.min(dimensions.width, dimensions.height) * 0.35

    const newPositions = characters.map((char, i) => {
      const angle = (i / characters.length) * Math.PI * 2 - Math.PI / 2
      const jitter = (Math.sin(i * 2.5) * 0.15 + 1) * radius
      return {
        id: char.id,
        x: centerX + Math.cos(angle) * jitter,
        y: centerY + Math.sin(angle) * jitter,
      }
    })
    setPositions(newPositions)
  }, [dimensions])

  const getPosition = (id: string) => positions.find((p) => p.id === id) || { x: 0, y: 0 }

  const connections: { from: string; to: string }[] = []
  characters.forEach((char) => {
    char.connections.forEach((connId) => {
      if (characters.find((c) => c.id === connId)) {
        const exists = connections.some(
          (conn) =>
            (conn.from === char.id && conn.to === connId) ||
            (conn.from === connId && conn.to === char.id)
        )
        if (!exists) {
          connections.push({ from: char.id, to: connId })
        }
      }
    })
  })

  const isConnected = (nodeId: string) => {
    if (!hoveredNode) return false
    if (nodeId === hoveredNode) return true
    return connections.some(
      (conn) =>
        (conn.from === hoveredNode && conn.to === nodeId) ||
        (conn.to === hoveredNode && conn.from === nodeId)
    )
  }

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: dimensions.height }}>
      {/* SVG for connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ed1d24" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#ed1d24" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ed1d24" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {connections.map((conn, i) => {
          const from = getPosition(conn.from)
          const to = getPosition(conn.to)
          const isHighlighted =
            hoveredNode && (conn.from === hoveredNode || conn.to === hoveredNode)

          return (
            <motion.line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={isHighlighted ? "#ed1d24" : "url(#lineGradient)"}
              strokeWidth={isHighlighted ? 3 : 1.5}
              opacity={hoveredNode ? (isHighlighted ? 1 : 0.1) : 0.4}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: i * 0.02, duration: 1 }}
            />
          )
        })}
      </svg>

      {/* Character Nodes */}
      {characters.map((character, i) => {
        const pos = getPosition(character.id)
        const highlighted = !hoveredNode || isConnected(character.id)

        return (
          <NetworkNode
            key={character.id}
            character={character}
            position={pos}
            index={i}
            highlighted={highlighted}
            isHovered={hoveredNode === character.id}
            onHover={(hovered) => setHoveredNode(hovered ? character.id : null)}
          />
        )
      })}
    </div>
  )
}

interface NetworkNodeProps {
  character: Character
  position: { x: number; y: number }
  index: number
  highlighted: boolean
  isHovered: boolean
  onHover: (hovered: boolean) => void
}

function NetworkNode({
  character,
  position,
  index,
  highlighted,
  isHovered,
  onHover,
}: NetworkNodeProps) {
  return (
    <Link href={`/personnage/${character.id}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: highlighted ? 1 : 0.3,
          scale: isHovered ? 1.2 : 1,
          x: position.x - 40,
          y: position.y - 40,
        }}
        transition={{
          delay: index * 0.03,
          type: "spring",
          stiffness: 100,
        }}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
        className="absolute cursor-pointer group"
      >
        {/* Glow effect */}
        <motion.div
          animate={{
            boxShadow: isHovered
              ? "0 0 40px rgba(237, 29, 36, 0.8), 0 0 80px rgba(237, 29, 36, 0.4)"
              : "0 0 20px rgba(237, 29, 36, 0.3)",
          }}
          className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/50 bg-card"
        >
          <Image
            src={character.image_url}
            alt={character.name}
            width={80}
            height={80}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 5 }}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-card border border-primary rounded-lg whitespace-nowrap z-10"
        >
          <p className="text-sm font-bold text-foreground">{character.name}</p>
          <p className="text-xs text-primary">{character.team}</p>
        </motion.div>
      </motion.div>
    </Link>
  )
}
