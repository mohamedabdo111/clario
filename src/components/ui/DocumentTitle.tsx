import { config } from "@/lib/config";

/** Sets the browser tab title. React hoists <title> into <head>. */
export function DocumentTitle({ title }: { title?: string }) {
  return <title>{title ? `${title} · ${config.productName}` : config.productName}</title>;
}
