import { GlobalConfiguration } from "../cfg"
import { ValidLocale } from "../i18n"
import { QuartzPluginData } from "../plugins/vfile"

interface Props {
  date: Date
  locale?: ValidLocale
}

export type ValidDateType = keyof Required<QuartzPluginData>["dates"]

export function getDate(cfg: GlobalConfiguration, data: QuartzPluginData): Date | undefined {
  if (!cfg.defaultDateType) {
    throw new Error(
      `Field 'defaultDateType' was not set in the configuration object of quartz.config.ts. See https://quartz.jzhao.xyz/configuration#general-configuration for more details.`,
    )
  }
  return data.dates?.[cfg.defaultDateType]
}

export function formatDate(d: Date, locale: ValidLocale = "ru-RU"): string {
  if (!d) return ""

  return d
    .toLocaleDateString(locale, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split(".")
    .reverse()
    .join(".")
}

export function Date({ date, locale }: Props) {
  return <>{formatDate(date, locale)}</>
}
