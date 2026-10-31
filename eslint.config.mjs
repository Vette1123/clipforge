import next from 'eslint-config-next/core-web-vitals'
import typescript from 'eslint-config-next/typescript'

const eslintConfig = [...next, ...typescript, { ignores: ['.next/**'] }]

export default eslintConfig
