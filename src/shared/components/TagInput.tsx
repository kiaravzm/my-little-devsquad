import * as React from 'react'
import { XIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export type TagListValue = string[]

const EMPTY_TAGS: TagListValue = []

type MergeOptions = {
  allowDuplicates: boolean
  maxTags?: number
}

function mergeTagChunks(
  existing: readonly string[],
  chunks: readonly string[],
  { allowDuplicates, maxTags }: MergeOptions,
): TagListValue {
  const next: TagListValue = [...existing]
  for (const raw of chunks) {
    const t = raw.trim()
    if (!t) continue
    if (maxTags !== undefined && next.length >= maxTags) break
    if (!allowDuplicates && next.some((x) => x.toLowerCase() === t.toLowerCase())) continue
    next.push(t)
  }
  return next
}

export type TagInputProps = Omit<
  React.ComponentPropsWithoutRef<typeof Input>,
  'value' | 'onChange' | 'type'
> & {
  /** Lista de tags; use `[]` quando o formulário ainda não definiu o campo. */
  value?: TagListValue | null
  onChange: (next: TagListValue) => void
  inputClassName?: string
  allowDuplicates?: boolean
  maxTags?: number
}

export const TagInput = React.forwardRef<HTMLInputElement, TagInputProps>(function TagInput(
  {
    value,
    onChange,
    className,
    inputClassName,
    disabled,
    id,
    'aria-invalid': ariaInvalid,
    allowDuplicates = false,
    maxTags,
    ...inputProps
  },
  ref,
) {
  const tags: TagListValue = value ?? EMPTY_TAGS
  const [draft, setDraft] = React.useState('')

  const pushChunks = React.useCallback(
    (chunks: readonly string[]) => {
      onChange(mergeTagChunks(tags, chunks, { allowDuplicates, maxTags }))
    },
    [allowDuplicates, maxTags, onChange, tags],
  )

  const commitDraft = React.useCallback(() => {
    onChange(mergeTagChunks(tags, [draft], { allowDuplicates, maxTags }))
    setDraft('')
  }, [allowDuplicates, draft, maxTags, onChange, tags])

  const removeAt = React.useCallback(
    (index: number) => {
      onChange(tags.filter((_, i) => i !== index))
    },
    [onChange, tags],
  )

  const handleDraftChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    if (!v.includes(',')) {
      setDraft(v)
      return
    }
    const parts = v.split(',')
    pushChunks(parts.slice(0, -1))
    setDraft(parts.at(-1) ?? '')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      commitDraft()
      return
    }
    if (e.key === ',') {
      e.preventDefault()
      pushChunks([e.currentTarget.value])
      setDraft('')
      return
    }
    if (e.key === 'Backspace' && draft === '' && tags.length > 0) {
      e.preventDefault()
      onChange(tags.slice(0, -1))
    }
  }

  return (
    <div
      className={cn(
        'flex min-h-8 flex-wrap items-center gap-1 rounded-lg border border-input bg-transparent bg-clip-padding px-2 py-1 text-sm transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 has-aria-invalid:border-destructive has-aria-invalid:ring-3 has-aria-invalid:ring-destructive/20 has-data-[slot=badge]:px-1 dark:bg-input/30 dark:has-aria-invalid:border-destructive/50 dark:has-aria-invalid:ring-destructive/40',
        disabled && 'pointer-events-none opacity-50',
        className,
      )}
    >
      {tags.map((tag, index) => (
        <Badge key={`${index}-${tag}`} variant="secondary" className="max-w-full gap-0.5 pr-0.5">
          <span className="min-w-0 truncate">{tag}</span>
          <button
            type="button"
            disabled={disabled}
            className="inline-flex size-5 shrink-0 items-center justify-center rounded-sm text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none"
            aria-label={`Remover ${tag}`}
            onClick={() => removeAt(index)}
          >
            <XIcon className="size-3" />
          </button>
        </Badge>
      ))}
      <Input
        {...inputProps}
        ref={ref}
        id={id}
        type="text"
        disabled={disabled}
        value={draft}
        onChange={handleDraftChange}
        onKeyDown={handleKeyDown}
        placeholder={tags.length === 0 ? inputProps.placeholder : undefined}
        aria-invalid={ariaInvalid}
        className={cn(
          'h-6 min-h-6 min-w-[8ch] flex-1 border-0 bg-transparent px-1 py-0 shadow-none focus-visible:ring-0 md:text-sm',
          inputClassName,
        )}
      />
    </div>
  )
})

TagInput.displayName = 'TagInput'
