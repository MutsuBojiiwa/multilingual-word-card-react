import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form"
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Locale } from "./edit"
import type { Dispatch, SetStateAction } from "react";
import React, { useEffect, useState } from "react"
import { Api } from "@/api/ApiWrapper";

interface LocaleSelectModalProps {
  isOpen: boolean
  onClose: () => void
  setLocales: Dispatch<SetStateAction<Locale[]>>
}

interface FormValues {
  localeIds: number[]
}

const FormSchema = z.object({
  localeIds: z.array(z.string({
    required_error: '言語は必須です'
  }))
});

const LocaleSelectModal: React.FC<LocaleSelectModalProps> = ({ isOpen, onClose, setLocales }) => {

  const [localeMaster, setLocaleMaster] = useState<Locale[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors,},
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      localeIds: [],
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    console.log(values)
    const localeIds = [...values.localeIds]
    Api.get('/locales/getByIds', {
      params: localeIds
    }).then((res) => {
      const newLocales = [...res.data]
      console.log(newLocales)
      setLocales(newLocales)
    }).catch((e) => {
      console.log(e)
    })

    onClose()
  }

  useEffect(() => {
    Api.get('/locales/getAll')
      .then((res) => {
        setLocaleMaster(res.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800/50">
      <div className="relative flex min-h-96 w-full max-w-lg flex-col items-center justify-center rounded-lg bg-white p-6 shadow-lg">
        <p className="mb-4">10種類まで言語を選択してください</p>
        <form className="flex flex-col items-center"
          onSubmit={handleSubmit(onSubmit)}>
          <table>
            {localeMaster.map((locale) => {
              return (
                <tr key={locale.id}>
                  <td>
                    <input {...register("localeIds")}
                      type="checkbox" id={locale.code} value={locale.id} />
                    <label className="pl-4" htmlFor={locale.code}>{locale.name}</label>
                  </td>
                </tr>
              );
            })}
          </table>
          {errors.localeIds && <p>{errors.localeIds.message}</p>}
          <input type="submit" className="mt-10 w-40 rounded bg-primary px-4 py-2 text-white" value="登録" />
        </form>
      </div>
    </div>
  )
}

export default LocaleSelectModal
