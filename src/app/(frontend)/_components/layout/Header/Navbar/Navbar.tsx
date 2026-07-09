import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'

import { NavPanelCard } from './components/NavPanelCard/NavPanelCard'
import { NAVIGATION } from './constants'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  Typography,
  buttonVariants,
  navigationMenuTriggerStyle,
} from '@/components/ui'
import { cn } from '@/lib/utils'

import type { Route } from 'next'

export const Navbar = () => (
  <div className="flex w-full items-center gap-5">
    <NavigationMenu
      className="max-w-none flex-1 justify-start"
      collisionPadding={0}
    >
      <NavigationMenuList className="justify-start gap-0.5">
        {NAVIGATION.map((item, index) => (
          <NavigationMenuItem key={`${item.label}-${index}`}>
            {item.featured && item.cards ? (
              <>
                <NavigationMenuTrigger className="text-muted-foreground hover:text-foreground focus:text-foreground data-popup-open:text-foreground bg-transparent px-3 shadow-none">
                  <Typography
                    as="span"
                    variant="link"
                  >
                    {item.label}
                  </Typography>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="grid min-h-84 w-dvw grid-cols-[1.08fr_1fr_1fr] grid-rows-2 gap-1.5">
                  <NavPanelCard
                    card={item.featured}
                    featured
                  />
                  {item.cards.map((card, index) => (
                    <NavPanelCard
                      key={`${card.title}-${index}`}
                      card={card}
                    />
                  ))}
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink
                render={<Link href={item.href as Route} />}
                className={cn(
                  navigationMenuTriggerStyle(),
                  'text-muted-foreground hover:bg-accent/60 hover:text-foreground focus:bg-accent/60 focus:text-foreground data-popup-open:bg-accent/60 data-popup-open:text-foreground bg-transparent px-3 shadow-none'
                )}
              >
                <Typography
                  as="span"
                  variant="link"
                >
                  {item.label}
                </Typography>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>

    <a
      href="https://www.rshu.edu.ua/pryimalna-komisiia"
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        buttonVariants({
          variant: 'secondary',
          size: 'sm',
        })
      )}
    >
      Вступнику
      <ArrowRightIcon data-icon="inline-end" />
    </a>
  </div>
)
