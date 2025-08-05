import { FlatCompat } from '@eslint/eslintrc'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname
})

const eslintConfig = [
	...compat.extends('next/core-web-vitals', 'next/typescript'),
	{
		rules: {
			'prefer-arrow-callback': 'error',
			'func-style': ['error', 'expression']
		}
	},
	{
		files: [
			'src/components/aceternity-ui/**/*',
			'src/components/animate-ui/**/*',
			'src/components/ui/**/*'
		],
		rules: {
			'prefer-arrow-callback': 'off',
			'func-style': 'off'
		}
	}
]

export default eslintConfig
