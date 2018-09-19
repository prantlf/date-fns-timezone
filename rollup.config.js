import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'

export default [
  {
    input: 'src/index.js',
    external: [
      'date-fns', 'timezone-support'
    ],
    output: {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'dateFnsTimezone',
      globals: {
        'date-fns/parse': 'dateFns.parse',
        'date-fns/format': 'dateFns.format',
        'timezone-support': 'timezone-support'
      },
      sourcemap: true
    },
    plugins: [
      babel({ exclude: 'node_modules/**' }),
      uglify()
    ]
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.js',
      format: 'cjs'
    },
    plugins: [
      babel({ exclude: 'node_modules/**' })
    ]
  },
  {
    input: 'src/convertToLocalTime.js',
    output: {
      file: 'dist/convertToLocalTime.js',
      format: 'cjs'
    },
    plugins: [
      babel({ exclude: 'node_modules/**' })
    ]
  },
  {
    input: 'src/convertToTimeZone.js',
    output: {
      file: 'dist/convertToTimeZone.js',
      format: 'cjs'
    },
    plugins: [
      babel({ exclude: 'node_modules/**' })
    ]
  },
  {
    input: 'src/parseFromString.js',
    output: {
      file: 'dist/parseFromString.js',
      format: 'cjs'
    },
    plugins: [
      babel({ exclude: 'node_modules/**' })
    ]
  },
  {
    input: 'src/parseFromTimeZone.js',
    output: {
      file: 'dist/parseFromTimeZone.js',
      format: 'cjs'
    },
    plugins: [
      babel({ exclude: 'node_modules/**' })
    ]
  },
  {
    input: 'src/formatToTimeZone.js',
    output: {
      file: 'dist/formatToTimeZone.js',
      format: 'cjs'
    },
    plugins: [
      babel({ exclude: 'node_modules/**' })
    ]
  }
]
