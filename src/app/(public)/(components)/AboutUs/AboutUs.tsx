import { UsersIcon } from 'lucide-react'
import Link from 'next/link'

import { ABOUT_ACCORDION_ITEMS } from './constants/data'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/animate-ui/radix/accordion'
import { Badge } from '@/components/ui/badge'

export const AboutUs = () => (
  <div className="pt-12 md:pt-24">
    <div className="mb-6 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <UsersIcon
          className="text-green-primary"
          size={20}
        />
        <Badge
          className="border-green-primary/20 text-green-primary border text-sm font-normal"
          variant="outline"
        >
          Про нас
        </Badge>
      </div>
      <Link
        href="/history"
        className="group text-green-primary hover:bg-green-primary/15 border-green-primary/15 flex w-auto items-center justify-center gap-1 rounded-full border px-4 py-1 text-sm font-medium transition-all duration-200 hover:scale-102"
      >
        <p>Детальніше про історію</p>
        <svg
          className="transition-transform duration-200 group-hover:translate-x-1"
          width={16}
          height={16}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </Link>
    </div>
    <h2 className="mb-4 text-2xl font-semibold sm:text-3xl">
      Факультет майбутнього для сучасного світу
    </h2>
    <p className="text-muted-foreground mb-8 max-w-2xl text-base sm:text-lg">
      Більше 90 років досвіду в підготовці математиків, програмістів та вчителів. Ваш шлях до успіху
      в цифровому світі починається тут.
    </p>
    <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
      <Accordion
        defaultValue="item-1"
        type="single"
        collapsible
        className="min-h-96 w-full lg:max-w-[500px]"
      >
        {ABOUT_ACCORDION_ITEMS.map(({ value, title, content, Icon }) => (
          <AccordionItem
            key={value}
            value={value}
          >
            <AccordionTrigger className="flex items-center gap-2">
              <div className="flex items-center gap-4">
                <Icon
                  className="text-green-primary"
                  size={20}
                />
                <span className="text-sm sm:text-base">{title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm sm:text-base">{content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="flex flex-col gap-6 text-base/[24px] font-medium sm:text-[17px]/[26px] lg:w-[420px]">
        <p className="w-full">
          Факультет математики та інформатики РДГУ поєднує багаторічні традиції математичної школи з
          інноваційними підходами до викладання IT-дисциплін. Ми готуємо висококваліфікованих
          фахівців, здатних вирішувати складні завдання сучасного цифрового світу.
        </p>
        <p className="w-full">
          Наші програми охоплюють від фундаментальних математичних досліджень до практичного
          програмування та штучного інтелекту. Ми віримо, що майбутнє належить тим, хто поєднує
          аналітичне мислення з технологічними навичками.
        </p>
      </div>
    </div>
  </div>
)
