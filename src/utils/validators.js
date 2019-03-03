export const required = value => (
        (value === Object(value) && Object.values(value).filter(value => !!value).length > 0)
        || (typeof value === 'string' &&  value.length > 0)
    )
    ? undefined
    : 'Required'
;
