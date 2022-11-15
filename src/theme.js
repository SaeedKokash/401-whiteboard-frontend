// theme.js

// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react'

// 2. Add your color mode config
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

// 3. extend the theme
const theme = extendTheme({ config })

const myTheme = extendTheme({
  colors: {
    primary: {
      100: '#C7D7E8',
      200: '#6B94C2',
      300: '#A9CAEF',
      400: '#5495DF',
      500: '#2161AB',
    },
    secondary: {
      100: `#D3C5EB`,
      200: '#B69BE4',
      300: '#8C68CA',
      400: '#8E65D5',
      500: '#5B2EA8',
    },
    warning: {
      100: '#FFE3E1',
      200: '#FE877C',
      300: '#FD2A17',
    },
    success: {
      100: '#CDEBB7',
      200: '#94D466',
      300: '#61A72F',
    },
  },
  textStyles: {
    h1: {
      fontSize: ['2xl', '3xl', '4xl'],
      fontWeight: 'bold',
      lineHeight: 'shorter',
      letterSpacing: 'wide',
    },
    h2: {
      fontSize: ['lg', 'xl', '1xl'],
      fontWeight: 'semibold',
      lineHeight: 'shorter',
      letterSpacing: 'wide',
    },
    h3: {
      fontSize: [`sm`, `md`, `lg`],
      fontWeight: 'semibold',
      lineHeight: 'shorter',
      letterSpacing: 'tight',
    },
    h4: {
      fontSize: [`xs`, `sm`, `md`],
      fontWeight: 'semibold',
      lineHeight: 'tight',
      letterSpacing: 'tight',
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
      },
      variants: {
        primary: {
          bg: 'primary.500',
          color: 'white',
          _hover: {
            bg: 'primary.400',
          },
        },
        secondary: {
          bg: 'secondary.500',
          color: 'white',
          _hover: {
            bg: 'secondary.400',
          },
        },
        warning: {
          bg: 'warning.300',
          color: 'white',
          _hover: {
            bg: 'warning.200',
          },
        },
        success: {
          bg: 'success.300',
          color: 'white',
          _hover: {
            bg: 'success.200',
          },
        },
      },
      defaultProps: {
        variant: 'primary',
      },
    },
  },
})

export default theme
export { myTheme }