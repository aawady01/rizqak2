import type { TypedSchema } from 'vee-validate'
import { ZodObject, ZodDefault, type ZodArray, type ZodSchema, type ZodTypeDef } from 'zod'

function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

function isIndex(value: string): boolean {
  return Number(value) >= 0
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== 'object' || value === null) return false
  if (Object.prototype.toString.call(value) !== '[object Object]') return false
  const proto = Object.getPrototypeOf(value)
  if (proto === null) return true
  let current = value
  while (Object.getPrototypeOf(current) !== null) {
    current = Object.getPrototypeOf(current) as object
  }
  return Object.getPrototypeOf(value) === current
}

function merge(target: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown> {
  Object.keys(source).forEach((key) => {
    if (isPlainObject(source[key]) && isPlainObject(target[key])) {
      merge(target[key] as Record<string, unknown>, source[key] as Record<string, unknown>)
      return
    }
    target[key] = source[key]
  })
  return target
}

function normalizeFormPath(path: string): string {
  const parts = path.split('.')
  if (!parts.length) return ''
  let fullPath = String(parts[0])
  for (let i = 1; i < parts.length; i++) {
    const part = parts[i]
    if (!part) continue
    if (isIndex(part)) {
      fullPath += `[${part}]`
    } else {
      fullPath += `.${part}`
    }
  }
  return fullPath
}

interface ZodIssue {
  code: string
  path: (string | number)[]
  message: string
  issues?: ZodIssue[]
}

function processIssues(
  issues: ZodIssue[],
  errors: Record<string, { errors: string[]; path: string }>,
): void {
  for (const issue of issues) {
    const path = normalizeFormPath(issue.path.join('.'))
    if (issue.code === 'invalid_union' && issue.issues) {
      processIssues(issue.issues, errors)
      if (!path) continue
    }
    if (!errors[path]) {
      errors[path] = { errors: [], path }
    }
    errors[path].errors.push(issue.message)
  }
}

function getDefaults(schema: ZodSchema): Record<string, unknown> | undefined {
  if (!(schema instanceof ZodObject)) {
    return undefined
  }
  const shape = (schema as ZodObject<Record<string, ZodSchema>>)._def.shape
  return Object.fromEntries(
    Object.entries(shape).map(([key, value]) => {
      if (value instanceof ZodDefault) {
        return [key, value._def.defaultValue]
      }
      if (value instanceof ZodObject) {
        return [key, getDefaults(value as ZodSchema)]
      }
      return [key, undefined]
    }),
  )
}

interface ZodObjectDef {
  type: 'object'
  shape: Record<string, ZodSchema>
}

interface ZodArrayDef {
  type: 'array'
  element: ZodSchema
}

function getDefType(schema: ZodSchema): string | undefined {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (schema as any)?._def?.type
}

function isObjectSchema(schema: ZodSchema): schema is ZodObject<Record<string, ZodSchema>> {
  return getDefType(schema) === 'object'
}

function isArraySchema(schema: ZodSchema): schema is ZodArray<ZodSchema> {
  return getDefType(schema) === 'array'
}

function getSchemaForPath(path: string, schema: ZodSchema): ZodSchema | null {
  if (!isObjectSchema(schema)) return null

  const normalizedPath = path.replace(/\[(\d+)\]/g, '.$1')
  const isDirectField = !normalizedPath.includes('.')

  if (isDirectField) {
    return ((schema as unknown as { _def: ZodObjectDef })._def).shape[path] ?? null
  }

  const paths = normalizedPath.split('.').filter(Boolean)
  let current: ZodSchema | null = schema

  for (const segment of paths) {
    if (!current) return null
    if (isObjectSchema(current)) {
      current = ((current as unknown as { _def: ZodObjectDef })._def).shape[segment] ?? null
    } else if (isArraySchema(current) && isIndex(segment)) {
      current = ((current as unknown as { _def: ZodArrayDef })._def).element ?? null
    } else {
      return null
    }
  }
  return current
}

export function toTypedSchema<TOutput, TDef extends ZodTypeDef, TInput = TOutput>(
  zodSchema: ZodSchema<TOutput, TDef, TInput>,
): TypedSchema<TOutput, TInput> {
  return {
    __type: 'VVTypedSchema' as const,
    async parse(value: unknown) {
      const result = await zodSchema.safeParseAsync(value)
      if (result.success) {
        return { value: result.data, errors: [] }
      }
      const errors: Record<string, { errors: string[]; path: string }> = {}
      processIssues(result.error.issues as ZodIssue[], errors)
      return { errors: Object.values(errors) }
    },
    cast(values: unknown) {
      try {
        return zodSchema.parse(values)
      } catch {
        if (zodSchema instanceof ZodObject) {
          const defaults = getDefaults(zodSchema)
          if (isObject(defaults) && isObject(values)) {
            return merge(defaults, values as Record<string, unknown>)
          }
        }
        return values
      }
    },
    describe(fieldPath?: string) {
      try {
        if (!fieldPath) {
          return { required: !zodSchema.isOptional(), exists: true }
        }
        const fieldSchema = getSchemaForPath(fieldPath, zodSchema)
        if (!fieldSchema) {
          return { required: false, exists: false }
        }
        return { required: !fieldSchema.isOptional(), exists: true }
      } catch {
        return { required: false, exists: false }
      }
    },
  } as unknown as TypedSchema<TOutput, TInput>
}
