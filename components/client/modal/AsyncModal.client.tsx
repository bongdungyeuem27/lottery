"use client"

import type { DialogBodyProps, DialogRootProps } from "@chakra-ui/react"
import {
  Button,
  DialogActionTrigger,
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogPositioner,
  DialogRoot,
  DialogTitle,
  Portal,
} from "@chakra-ui/react"
import IconSVGServer from "components/server/icon/IconSVG.server"
import CloseSVG from "public/icons/close.svg"
import type { ForwardedRef, JSX, ReactNode } from "react"
import { memo, useImperativeHandle, useRef, useState } from "react"

export type AsyncModalState = {
  onOpen: () => Promise<void>
  onClose: () => void
}

type Props = {
  children?: ReactNode
  title?: ReactNode | JSX.Element
  footer?: ReactNode
  ref: ForwardedRef<AsyncModalState>
  cancelTitle?: string
  actionTitle?: string
  modalProps?: Partial<DialogRootProps>
  hasCloseButton?: boolean
  preTitle?: ReactNode
} & Partial<Omit<DialogBodyProps, "ref" | "onSubmit" | "onOpen" | "title">>

export type AsyncModalProps = Partial<Props>

const AsyncModal = ({
  title,
  children,
  footer,
  actionTitle,
  cancelTitle,
  modalProps,
  preTitle,
  ref,
  ...props
}: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const waitPromiseRef = useRef<{
    resolve: AnyFunction
    reject: AnyFunction
  } | null>(null)

  useImperativeHandle(
    ref,
    () => ({
      onOpen: () => {
        return new Promise<void>((resolve, reject) => {
          waitPromiseRef.current = {
            resolve: () => {
              resolve()
              setIsOpen(false)
            },
            reject: () => {
              reject(false)
              setIsOpen(false)
            },
          }
          setIsOpen(true)
        })
      },
      onClose: () => {
        waitPromiseRef.current?.resolve()
      },
    }),
    [ref],
  )

  return (
    <DialogRoot
      lazyMount
      placement="top"
      open={isOpen}
      scrollBehavior="outside"
      closeOnInteractOutside
      // onFocusOutside={() => {
      //   waitPromiseRef.current?.reject()
      // }}
      // onInteractOutside={() => {
      //   waitPromiseRef.current?.reject()
      // }}
      // onPointerDownOutside={() => {
      //   waitPromiseRef.current?.reject()
      // }}
      // onEscapeKeyDown={() => {
      //   waitPromiseRef.current?.reject()
      // }}
      onOpenChange={(e) => {
        if (!e.open) {
          waitPromiseRef.current?.reject()
        }
      }}
      {...modalProps}
    >
      <Portal>
        <DialogBackdrop />
        <DialogPositioner>
          <DialogContent
            zIndex={800}
            borderWidth={1}
            display="flex"
            flexDirection="column"
            alignItems="stretch"
            {...props}
          >
            <DialogHeader
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              padding={4}
            >
              {preTitle}
              {title && (
                <DialogTitle
                  _empty={{
                    display: "none",
                  }}
                >
                  {title}
                </DialogTitle>
              )}
              <DialogCloseTrigger asChild>
                <IconSVGServer
                  marginLeft="auto"
                  cursor="pointer"
                  color="neutral.1"
                  data={CloseSVG}
                  boxSize={6}
                />
              </DialogCloseTrigger>
            </DialogHeader>

            {children && (
              <DialogBody
                display="flex"
                flexDirection="column"
                gap={8}
                alignItems="stretch"
                _empty={{
                  display: "none",
                }}
              >
                {children}
              </DialogBody>
            )}

            <DialogFooter>
              {footer || (
                <>
                  <DialogActionTrigger asChild>
                    <Button
                      variant="outline"
                      backgroundColor="neutral.1"
                      color="neutral.8"
                    >
                      {cancelTitle || "Đóng"}
                    </Button>
                  </DialogActionTrigger>
                  <Button
                    colorPalette="primary"
                    onClick={() => {
                      waitPromiseRef.current?.resolve()
                    }}
                  >
                    {actionTitle || "Xác nhận"}
                  </Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </DialogPositioner>
      </Portal>
    </DialogRoot>
  )
}

export default memo(AsyncModal)
