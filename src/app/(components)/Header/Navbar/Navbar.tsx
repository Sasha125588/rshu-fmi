import { SearchIcon } from 'lucide-react'

import { NavbarItem } from './components/NavbarItem/NavbarItem'
import { NAVBAR_DOWN_DATA, NAVBAR_UP_DATA } from './constants/data'
import { Input } from '@/components/ui/input'

export const Navbar = () => (
  <div className="w-full">
    <div className="flex w-full items-center justify-between gap-6">
      <ul className="flex items-center gap-1">
        {NAVBAR_UP_DATA.items.map((item) => (
          <NavbarItem
            variant="link"
            key={item.name}
            item={item}
          />
        ))}
      </ul>
      <div className="flex items-center gap-3">
        <ul className="flex items-center gap-1">
          {NAVBAR_DOWN_DATA.items.map((item) => (
            <NavbarItem
              variant="outline"
              key={item.name}
              item={item}
            />
          ))}
        </ul>
        <div className="relative">
          <Input
            className="h-8 w-40 rounded-full border-white/10 bg-white/5 ps-8 pe-10 text-sm"
            placeholder="Пошук..."
            autoFocus={false}
            type="search"
          />
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 peer-disabled:opacity-50">
            <SearchIcon size={14} />
          </div>
          <div className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-2">
            <kbd className="text-muted-foreground/70 inline-flex h-5 max-h-full items-center rounded border border-white/10 px-1 font-[inherit] text-[0.625rem] font-medium">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>
    </div>
  </div>
)
