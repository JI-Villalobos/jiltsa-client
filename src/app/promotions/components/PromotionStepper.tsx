'use client'

import clsx from "clsx"
import { LuCheck } from "react-icons/lu"

export const PROMOTION_STEPS = ['Promoción', 'Artículos', 'Fotografías'] as const

interface Props {
  /** 1-based step the user is on; steps before it are done. Greater than the count means all done. */
  current: number
}

export const PromotionStepper = ({ current }: Props) => (
  <ol className="flex w-full max-w-3xl items-center justify-between text-xs">
    {PROMOTION_STEPS.map((label, index) => {
      const step = index + 1
      const done = step < current
      const active = step === current
      return (
        <li key={label} className="flex flex-1 items-center">
          <div className="flex items-center gap-2">
            <span className={clsx(
              "flex h-7 w-7 items-center justify-center rounded-full border text-sm",
              {
                "bg-mp-green text-mp-white border-mp-green": done,
                "border-mp-blue text-mp-blue": active,
                "border-mp-strong-gray text-mp-soft-dark": !done && !active
              }
            )}>
              {done ? <LuCheck size={16} /> : step}
            </span>
            <span className={clsx({ "text-mp-green": done, "text-mp-blue": active, "text-mp-soft-dark": !done && !active })}>
              {label}
            </span>
          </div>
          {index < PROMOTION_STEPS.length - 1 && (
            <div className={clsx("mx-2 h-0.5 flex-1 rounded", done ? "bg-mp-green" : "bg-mp-strong-gray")} />
          )}
        </li>
      )
    })}
  </ol>
)
