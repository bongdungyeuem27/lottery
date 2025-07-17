"use client"

import { Menu } from "@chakra-ui/react"
import IconSVGServer from "components/server/icon/IconSVG.server"
import GearSVG from "public/icons/gear.svg"
import { memo, useRef, useState } from "react"
import { useOnClickOutside } from "usehooks-ts"

type Props = {
  loading?: boolean
  items: { label: string; onClick: () => void }[]
}

const TableAction = ({ loading, items }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLButtonElement>(undefined as any)

  useOnClickOutside(ref, () => {
    setIsOpen(false)
  })

  return (
    <Menu.Root
      variant="subtle"
      positioning={{ placement: "bottom-end" }}
      lazyMount
      closeOnSelect
      open={isOpen}
      onSelect={() => {
        setIsOpen(false)
      }}
      onOpenChange={(open) => {
        setIsOpen(open.open)
      }}
    >
      <Menu.Trigger ref={ref} cursor="pointer">
        <IconSVGServer
          data={GearSVG}
          float="right"
          boxSize={5}
          color="neutral.7"
          loading={loading}
        />
      </Menu.Trigger>

      <Menu.Positioner>
        <Menu.Content>
          <Menu.ItemGroup
            alignItems="stretch"
            display="flex"
            flexDirection="column"
            gap={2}
          >
            {items.map((item) => (
              <Menu.Item key={item.label} value={item.label} cursor="pointer">
                {item.label}
              </Menu.Item>
            ))}
          </Menu.ItemGroup>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
}

export default memo(TableAction, (prev, next) => {
  return prev.loading === next.loading && prev.items === next.items
})
