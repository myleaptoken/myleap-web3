"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Sparkles, MessageCircle, Gift, Users, User, Package } from "lucide-react"

interface SanacionOption {
  id: string
  title: string
  description: string | null
  price: string
  badge: string | null
  whatsapp_message: string
}

interface SanacionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  config: {
    modal_title: string
    modal_subtitle: string | null
    whatsapp_number: string
  }
  options: SanacionOption[]
}

const badgeIcons: Record<string, React.ReactNode> = {
  "Prueba": <Gift className="h-3 w-3" />,
  "2x1": <Users className="h-3 w-3" />,
  "Individual": <User className="h-3 w-3" />,
  "Mejor Valor": <Package className="h-3 w-3" />,
}

export function SanacionModal({ open, onOpenChange, config, options }: SanacionModalProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  function handleOptionClick(option: SanacionOption) {
    const message = encodeURIComponent(option.whatsapp_message)
    const waUrl = `https://wa.me/${config.whatsapp_number}?text=${message}`
    window.open(waUrl, "_blank")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-border bg-card p-0 overflow-hidden">
        {/* Header con gradiente */}
        <div className="relative px-6 pt-6 pb-4 bg-gradient-to-br from-cyan-600/20 via-background to-background">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-button-animated">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <DialogHeader className="text-left space-y-0.5">
              <DialogTitle className="text-lg font-bold text-foreground">
                {config.modal_title}
              </DialogTitle>
              {config.modal_subtitle && (
                <DialogDescription className="text-xs text-muted-foreground">
                  {config.modal_subtitle}
                </DialogDescription>
              )}
            </DialogHeader>
          </div>
        </div>

        {/* Options */}
        <div className="px-4 pb-4 space-y-2">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option)}
              onMouseEnter={() => setHoveredId(option.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`
                w-full flex items-center gap-3 p-3 rounded-xl border transition-all duration-300
                ${hoveredId === option.id 
                  ? "border-cyan-500/50 bg-cyan-500/10 shadow-lg shadow-cyan-500/10 scale-[1.02]" 
                  : "border-border bg-secondary/30 hover:border-cyan-500/30"
                }
              `}
            >
              {/* Badge icon */}
              <div className={`
                flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-all duration-300
                ${hoveredId === option.id 
                  ? "gradient-button-animated" 
                  : "bg-secondary text-muted-foreground"
                }
              `}>
                {option.badge && badgeIcons[option.badge] 
                  ? badgeIcons[option.badge] 
                  : <Sparkles className="h-4 w-4" />
                }
              </div>

              {/* Content */}
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground truncate">
                    {option.title}
                  </span>
                  {option.badge && (
                    <span className={`
                      text-[10px] font-medium px-1.5 py-0.5 rounded-full shrink-0
                      ${hoveredId === option.id 
                        ? "bg-cyan-500/20 text-cyan-400" 
                        : "bg-secondary text-muted-foreground"
                      }
                    `}>
                      {option.badge}
                    </span>
                  )}
                </div>
                {option.description && (
                  <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                    {option.description}
                  </p>
                )}
              </div>

              {/* Price */}
              <div className={`
                text-right shrink-0 transition-colors duration-300
                ${hoveredId === option.id ? "text-cyan-400" : "text-foreground"}
              `}>
                <span className="text-sm font-bold">{option.price}</span>
              </div>

              {/* WhatsApp indicator */}
              <MessageCircle className={`
                h-4 w-4 shrink-0 transition-all duration-300
                ${hoveredId === option.id 
                  ? "text-green-400 scale-110" 
                  : "text-muted-foreground"
                }
              `} />
            </button>
          ))}
        </div>

        {/* Footer hint */}
        <div className="px-4 pb-4">
          <p className="text-[10px] text-center text-muted-foreground">
            Al seleccionar una opcion seras redirigido a WhatsApp
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
