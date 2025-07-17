"use client"

import type { ButtonProps } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import { useWatchState } from "hooks/client/useWatchState"
import { isEmpty } from "lodash"
import type { ForwardedRef } from "react"
import { memo, useEffect, useRef } from "react"
import { useFormContext } from "react-hook-form"
import { multipleRef } from "utils/dom"

type Props = {
  submitButtonProps?: Partial<ButtonProps>
  isDirty?: boolean
  isSubmitting?: boolean
  onSuccess?: () => void
  onClick: () => {
    handler: AnyFunction<any>
    onSuccess?: AnyFunction<any>
    onError?: AnyFunction<any>
  }
  disableSubmitWhenDirty?: boolean
} & Omit<ButtonProps, "onClick">

export type ProfileActionState = {
  onChangeIsDirty: (value: boolean) => void
  onChangeIsSubmiting: (value: boolean) => void
}

const AsyncModalAction = (
  {
    onClick,
    disabled,
    loading,
    children,
    type,
    isDirty: parentIsDirty,
    isSubmitting: parentIsSubmitting,
    disableSubmitWhenDirty,
    ...props
  }: Props,
  ref?: ForwardedRef<ProfileActionState>,
) => {
  const formApi = useFormContext()

  const localIsError = !isEmpty(formApi?.formState?.errors)

  const [isDirty, setIsDirty] = useWatchState(
    Boolean(parentIsDirty || formApi?.formState?.isDirty),
  )

  const [isSubmitting, setIsSubmitting] = useWatchState(
    Boolean(parentIsSubmitting || formApi?.formState.isSubmitting),
  )

  const waitSubmitedRef = useRef<
    Pick<ReturnType<Props["onClick"]>, "onSuccess" | "onError"> | undefined
  >(undefined)

  useEffect(() => {
    if (!ref) return
    multipleRef<ProfileActionState>(
      {
        onChangeIsDirty: setIsDirty,
        onChangeIsSubmiting: setIsSubmitting,
      },
      ref,
    )
  }, [ref])

  useEffect(() => {
    ;(async () => {
      if (isSubmitting || !waitSubmitedRef.current) return
      const { onSuccess, onError } = waitSubmitedRef.current

      if (localIsError) await onError?.()
      else {
        await onSuccess?.()
        waitSubmitedRef.current = undefined
      }
    })()
  }, [isSubmitting])

  return (
    <Button
      onClick={async () => {
        const { handler, onSuccess, onError } = onClick()

        waitSubmitedRef.current = {
          onSuccess,
          onError,
        }
        await Promise.resolve(handler())
      }}
      className="chakra-modal__action"
      variant="solid"
      type={type}
      disabled={
        disabled ||
        (disableSubmitWhenDirty && type === "submit"
          ? isDirty === false || localIsError
            ? true
            : undefined
          : undefined)
      }
      minWidth={{ lg: "7.5rem" }}
      loading={loading || isSubmitting}
      {...props}
    >
      {children}
    </Button>
  )
}

export type AsyncModalActionProps = Props

export default memo(AsyncModalAction)
