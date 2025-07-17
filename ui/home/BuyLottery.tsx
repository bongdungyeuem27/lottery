"use client"

import {
  Button,
  DialogActionTrigger,
  Field,
  Input,
  PinInput,
  Stack,
} from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import AsyncModal, {
  type AsyncModalState,
} from "components/client/modal/AsyncModal.client"
import { toaster } from "components/server/toast/toast.config"
import { memo, useCallback } from "react"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { multipleRef } from "utils/dom"
import { writeContract } from "viem/actions"
import { useAccount, useWalletClient } from "wagmi"
import { abi, contract, ticketPrice } from "./abi"
import type { IForm } from "./types"
import { schema } from "./types"

type Props = {
  ref: React.ForwardedRef<AsyncModalState>
}

const BuyLottery = ({ ref }: Props) => {
  const form = useForm<IForm>({
    defaultValues: {
      full_name: "",
      personal_id: "",
      predict_number: "",
    },
    resolver: zodResolver(schema),
  })

  const { control, handleSubmit, formState, reset } = form

  const { address } = useAccount()

  const { data: walletClient } = useWalletClient()

  const onValid = useCallback(
    async (data: any) => {
      console.log(data)
      return await writeContract(walletClient!, {
        address: contract,
        abi: abi,
        functionName: "buyTicket",
        args: [data.predict_number, data.full_name, data.personal_id],
        value: ticketPrice,
      })
        .then((data) => {
          console.log(data)
          toaster.success({
            title: "Mua vé thành công",
          })
        })
        .catch((error) => {
          console.log(error)
          toaster.error({
            title: "Mua vé thất bại",
          })
        })
    },
    [walletClient],
  )

  const onInvalid = useCallback((error: any) => {
    console.log(error)
  }, [])

  return (
    <FormProvider {...form}>
      <AsyncModal
        hasCloseButton
        ref={(e) =>
          multipleRef(
            {
              ...e!,
              onOpen: async () => {
                reset()
                return await e!.onOpen()
              },
            },
            ref,
          )
        }
        title="Mua vé"
        footer={
          <>
            <DialogActionTrigger asChild>
              <Button
                variant="outline"
                backgroundColor="neutral.1"
                color="neutral.8"
              >
                Đóng
              </Button>
            </DialogActionTrigger>
            <Button
              colorPalette="orange"
              variant="solid"
              boxShadow="primary"
              loading={formState.isSubmitting}
              onClick={handleSubmit(onValid, onInvalid)}
            >
              Mua vé
            </Button>
          </>
        }
      >
        <Stack maxWidth="100%" as="form" gap={6}>
          <Field.Root>
            <Field.Label>Địa chỉ ví</Field.Label>
            <Input
              variant="subtle"
              value={address}
              disabled
              placeholder="Kết nối ví..."
            />
          </Field.Root>
          <Controller
            control={control}
            name="full_name"
            render={({ field, fieldState: { error } }) => (
              <Field.Root required invalid={Boolean(error)}>
                <Field.Label>
                  Họ và tên <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  placeholder="Nhập họ và tên"
                  variant="subtle"
                  {...field}
                />
                <Field.ErrorText>{error?.message}</Field.ErrorText>
              </Field.Root>
            )}
          />
          <Controller
            control={control}
            name="personal_id"
            render={({ field, fieldState: { error } }) => (
              <Field.Root required invalid={Boolean(error)}>
                <Field.Label>
                  Số CCCD <Field.RequiredIndicator />
                </Field.Label>
                <Input placeholder="Nhập số CCCD" variant="subtle" {...field} />
                <Field.ErrorText>{error?.message}</Field.ErrorText>
              </Field.Root>
            )}
          />
          <Controller
            control={control}
            name="predict_number"
            render={({ field, fieldState: { error } }) => (
              <Field.Root required invalid={Boolean(error)}>
                <Field.Label>
                  Số dự đoán <Field.RequiredIndicator />
                </Field.Label>
                <PinInput.Root
                  textAlign="center"
                  value={[...Array(3)].map(
                    (_, i) => field.value?.[i]?.replace("_", "") || "",
                  )}
                  onValueChange={(e) =>
                    field.onChange(
                      [...Array(3)]
                        .map((_, i) => e?.value?.[i] || "_")
                        .join(""),
                    )
                  }
                >
                  <PinInput.HiddenInput />
                  <PinInput.Control>
                    <PinInput.Input
                      borderColor="orange.300"
                      borderWidth={1.5}
                      index={0}
                      maxLength={1}
                    />
                    <PinInput.Input
                      borderColor="orange.300"
                      borderWidth={1.5}
                      index={1}
                      maxLength={1}
                    />
                    <PinInput.Input
                      borderColor="orange.300"
                      borderWidth={1.5}
                      index={2}
                      maxLength={1}
                    />
                  </PinInput.Control>
                  <Field.ErrorText>{error?.message}</Field.ErrorText>
                </PinInput.Root>
              </Field.Root>
            )}
          />
        </Stack>
      </AsyncModal>
    </FormProvider>
  )
}

export default memo(BuyLottery)
